---
id: dotnet
title: .NET OpenTelemetry Instrumentation
description: Send events from your .NET application to SigNoz

---

import InstrumentationFAQ from '../shared/instrumentation-faq.md'
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# .NET OpenTelemetry Instrumentation

This document contains instructions on how to set up OpenTelemetry(OTel) instrumentation in your .NET application. OpenTelemetry, also known as OTel for short, is an open-source observability framework that can help you generate and collect telemetry data - traces, metrics, and logs from your .NET application.

OpenTelemetry .NET is the language-specific implementation of OpenTelemetry in .NET.

Once the telemetry data is generated, you can configure an exporter to send the data to SigNoz for monitoring and visualization.

There are three major steps to using OpenTelemetry:

- Instrumenting your .NET application with OpenTelemetry
- Configuring the exporter to send data to SigNoz
- Validating that configuration to ensure that data is being sent as expected.

In this tutorial, we will instrument a .NET application for traces and send it to SigNoz.

## Requirements

[.NET SDK](https://dotnet.microsoft.com/en-us/download)

## Send Traces to SigNoz Cloud

Based on your application environment, you can choose the setup below to send traces to SigNoz Cloud.

<Tabs>
<TabItem value="vm" label="VM" default>

Tthere are two ways to send data to SigNoz Cloud.

- [Send traces directly to SigNoz Cloud](#send-traces-directly-to-signoz-cloud)
- [Send traces via OTel Collector binary](#send-traces-via-otel-collector-binary) (recommended)

#### Send traces directly to SigNoz Cloud

**Step 1: Installing the OpenTelemetry dependency packages:**

```bash
dotnet add package OpenTelemetry
dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol 
dotnet add package OpenTelemetry.Extensions.Hosting
dotnet add package OpenTelemetry.Instrumentation.Runtime
dotnet add package OpenTelemetry.Instrumentation.AspNetCore 
dotnet add package OpenTelemetry.AutoInstrumentation
```

**Step 2: Adding OpenTelemetry as a service and configuring exporter options in `Program.cs`:**

In your `Program.cs` file, add OpenTelemetry as a service. Here, we are configuring these variables:

- `serviceName` - It is the name of your service.
- `otlpOptions.Endpoint` - It is the endpoint for SigNoz Cloud.
- `<SIGNOZ_INGESTION_KEY>` - You will get your ingestion key when you [sign up](https://signoz.io/teams/) for SigNoz cloud.

Here’s a sample `Program.cs` file with the configured variables.

```bash
using System.Diagnostics;
using OpenTelemetry.Exporter;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

var builder = WebApplication.CreateBuilder(args);

// Configure OpenTelemetry with tracing and auto-start.
builder.Services.AddOpenTelemetry()
    .ConfigureResource(resource => 
		resource.AddService(serviceName: "sample-net-app"))
    .WithTracing(tracing => tracing
        .AddAspNetCoreInstrumentation()
        .AddOtlpExporter(otlpOptions =>
        {
						//sigNoz Cloud Endpoint 
            otlpOptions.Endpoint = new Uri("https://ingest.{region}.signoz.cloud:443");

            otlpOptions.Protocol = OtlpExportProtocol.Grpc;
						
						//SigNoz Cloud account Ingestion key
            string headerKey = "signoz-access-token";
            string headerValue = "<SIGNOZ_INGESTION_KEY>";

            string formattedHeader = $"{headerKey}={headerValue}";
            otlpOptions.Headers = formattedHeader;
        }));

var app = builder.Build();

//The index route ("/") is set up to write out the OpenTelemetry trace information on the response:
app.MapGet("/", () => $"Hello World! OpenTelemetry Trace: {Activity.Current?.Id}");

app.Run();
```

Depending on the choice of your region for SigNoz cloud, the ingest endpoint will vary according to this table.

| Region | Endpoint |
| --- | --- |
| US | ingest.us.signoz.cloud:443 |
| IN | ingest.in.signoz.cloud:443 |
| EU | ingest.eu.signoz.cloud:443 |

The program uses the <a href = "https://github.com/open-telemetry/opentelemetry-dotnet/blob/main/src/OpenTelemetry.Instrumentation.AspNetCore/README.md" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry.Instrumentation.AspNetCore</a> package to automatically create traces for incoming ASP.NET Core requests.

The `OpenTelemetry.Exporter.Options` get or set the target to which the exporter is going to send traces. Here, we’re configuring it to send traces to the SigNoz cloud. The target must be a valid Uri with the scheme (`http` or `https`) and host and may contain a port and a path.

This is done by configuring an OpenTelemetry <a href = "https://github.com/open-telemetry/opentelemetry-dotnet/blob/main/docs/trace/customizing-the-sdk/README.MD#tracerprovider" rel="noopener noreferrer nofollow" target="_blank" >TracerProvider</a> using extension methods and setting it to auto-start when the host is started.

**Note**: You can find your Signoz cloud address and ingestion key under the settings of your Signoz cloud account.



<figure data-zoomable align='center'>
    <img src="/img/docs/ingestion_key_details.webp" alt="Access the ingestion key details in SigNoz UI"/>
    <figcaption><i>Access the ingestion key details in SigNoz UI</i></figcaption>
</figure>


**Step 3. Running the .NET application:**

```bash
dotnet build
dotnet run
```

**Step 4: Generating some load data and checking your application in SigNoz UI**

Once your application is running, generate some traffic by interacting with it.

In the SigNoz account, open the `Services` tab. Hit the `Refresh` button on the top right corner, and your application should appear in the list of `Applications`. Ensure that you're checking data for the `time range filter` applied in the top right corner. You might have to wait for a few seconds before the data appears on SigNoz UI.



<figure data-zoomable align='center'>
    <img src="/img/docs/sample_net_app.webp" alt="The sample .NET application is being monitored in the SigNoz ‘Services’ tab"/>
    <figcaption><i>The sample .NET application is being monitored in the SigNoz ‘Services’ tab</i></figcaption>
</figure>

---

#### Send traces via OTel Collector binary

**Step 1: Setting up OpenTelemetry Collector binary as an agent in your machine**

OpenTelemetry Collector binary helps to collect logs, hostmetrics, resource and infra attributes. It is recommended to install OTel Collector binary to collect and send traces to SigNoz cloud. You can correlate signals and have rich contextual data through this way.

Go to [setup OTel Collector binary](https://signoz.io/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/) to install Otel Collector as agent that will collect telemetry data from your sample dotnet app and send it to SigNoz cloud.  


**Step 2: Installing the OpenTelemetry dependency packages:**

Install the following dependencies in your application. 

```bash
dotnet add package OpenTelemetry
dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol 
dotnet add package OpenTelemetry.Extensions.Hosting
dotnet add package OpenTelemetry.Instrumentation.Runtime
dotnet add package OpenTelemetry.Instrumentation.AspNetCore 
dotnet add package OpenTelemetry.AutoInstrumentation
```

**Step 2: Adding OpenTelemetry as a service and configuring exporter options in `Program.cs`:**

In your `Program.cs` file, add OpenTelemetry as a service. Here, we are configuring these variables:

- `serviceName` - It is the name of your service.
- `otlpOptions.Endpoint` - It is the endpoint for your OTel Collector binary agent.

Here’s a sample `Program.cs` file with the configured variables. 

```bash
using System.Diagnostics;
using OpenTelemetry.Exporter;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

var builder = WebApplication.CreateBuilder(args);

// Configure OpenTelemetry with tracing and auto-start.
builder.Services.AddOpenTelemetry()
    .ConfigureResource(resource => 
		resource.AddService(serviceName: "sample-net-app"))
    .WithTracing(tracing => tracing
        .AddAspNetCoreInstrumentation()
        .AddOtlpExporter(otlpOptions =>
        {
						//sigNoz Cloud Endpoint 
            otlpOptions.Endpoint = new Uri("http://localhost:4317");

            otlpOptions.Protocol = OtlpExportProtocol.Grpc;
        }));

var app = builder.Build();

//The index route ("/") is set up to write out the OpenTelemetry trace information on the response:
app.MapGet("/", () => $"Hello World! OpenTelemetry Trace: {Activity.Current?.Id}");

app.Run();
```


The program uses the <a href = "https://github.com/open-telemetry/opentelemetry-dotnet/blob/main/src/OpenTelemetry.Instrumentation.AspNetCore/README.md" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry.Instrumentation.AspNetCore</a> package to automatically create traces for incoming ASP.NET Core requests.

The `OpenTelemetry.Exporter.Options` get or set the target to which the exporter is going to send traces. Here, we’re configuring it to send traces to the OTel collector agent. The target must be a valid Uri with the scheme (`http` or `https`) and host and may contain a port and a path.

This is done by configuring an OpenTelemetry <a href = "https://github.com/open-telemetry/opentelemetry-dotnet/blob/main/docs/trace/customizing-the-sdk/README.MD#tracerprovider" rel="noopener noreferrer nofollow" target="_blank" >TracerProvider</a> using extension methods and setting it to auto-start when the host is started.



**Step 4. Running the .NET application:**

```bash
dotnet build
dotnet run
```

**Step 5: Generating some load data and checking your application in SigNoz UI**

After the Otel collector is all set and running, and your too application is running, generate some traffic by interacting with it.

In the SigNoz account, open the `Services` tab. Hit the `Refresh` button on the top right corner, and your application should appear in the list of `Applications`. Ensure that you're checking data for the `time range filter` applied in the top right corner. You might have to wait for a few seconds before the data appears on SigNoz UI.



<figure data-zoomable align='center'>
    <img src="/img/docs/sample_net_app.webp" alt="The sample .NET application is being monitored in the SigNoz ‘Services’ tab"/>
    <figcaption><i>The sample .NET application is being monitored in the SigNoz ‘Services’ tab</i></figcaption>
</figure>

</TabItem>
<TabItem value="k8s" label="Kubernetes">

For .NET application deployed on Kubernetes, you need to install OTel Collector agent in your k8s infra to collect and send traces to SigNoz Cloud. You can find the instructions to install OTel Collector agent [here](/docs/tutorial/kubernetes-infra-metrics/).

Once you have set up OTel Collector agent, you can proceed with OpenTelemetry .NET instrumentation by following the below steps:

**Step 2: Installing the OpenTelemetry dependency packages:**

Install the following dependencies in your application. 

```bash
dotnet add package OpenTelemetry
dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol 
dotnet add package OpenTelemetry.Extensions.Hosting
dotnet add package OpenTelemetry.Instrumentation.Runtime
dotnet add package OpenTelemetry.Instrumentation.AspNetCore 
dotnet add package OpenTelemetry.AutoInstrumentation
```

**Step 2: Adding OpenTelemetry as a service and configuring exporter options in `Program.cs`:**

In your `Program.cs` file, add OpenTelemetry as a service. Here, we are configuring these variables:

- `serviceName` - It is the name of your service.
- `otlpOptions.Endpoint` - It is the endpoint for your OTel Collector agent.

Here’s a sample `Program.cs` file with the configured variables. 

```bash
using System.Diagnostics;
using OpenTelemetry.Exporter;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

var builder = WebApplication.CreateBuilder(args);

// Configure OpenTelemetry with tracing and auto-start.
builder.Services.AddOpenTelemetry()
    .ConfigureResource(resource => 
		resource.AddService(serviceName: "sample-net-app"))
    .WithTracing(tracing => tracing
        .AddAspNetCoreInstrumentation()
        .AddOtlpExporter(otlpOptions =>
        {
						//sigNoz Cloud Endpoint 
            otlpOptions.Endpoint = new Uri("http://localhost:4317");

            otlpOptions.Protocol = OtlpExportProtocol.Grpc;
        }));

var app = builder.Build();

//The index route ("/") is set up to write out the OpenTelemetry trace information on the response:
app.MapGet("/", () => $"Hello World! OpenTelemetry Trace: {Activity.Current?.Id}");

app.Run();
```


The program uses the <a href = "https://github.com/open-telemetry/opentelemetry-dotnet/blob/main/src/OpenTelemetry.Instrumentation.AspNetCore/README.md" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry.Instrumentation.AspNetCore</a> package to automatically create traces for incoming ASP.NET Core requests.

The `OpenTelemetry.Exporter.Options` get or set the target to which the exporter is going to send traces. Here, we’re configuring it to send traces to the OTel Collector agent. The target must be a valid Uri with the scheme (`http` or `https`) and host and may contain a port and a path.

This is done by configuring an OpenTelemetry <a href = "https://github.com/open-telemetry/opentelemetry-dotnet/blob/main/docs/trace/customizing-the-sdk/README.MD#tracerprovider" rel="noopener noreferrer nofollow" target="_blank" >TracerProvider</a> using extension methods and setting it to auto-start when the host is started.



**Step 4. Running the .NET application:**

```bash
dotnet build
dotnet run
```

**Step 5: Generating some load data and checking your application in SigNoz UI**

After the Otel collector is all set and running, and your too application is running, generate some traffic by interacting with it.

In the SigNoz account, open the `Services` tab. Hit the `Refresh` button on the top right corner, and your application should appear in the list of `Applications`. Ensure that you're checking data for the `time range filter` applied in the top right corner. You might have to wait for a few seconds before the data appears on SigNoz UI.



<figure data-zoomable align='center'>
    <img src="/img/docs/sample_net_app.webp" alt="The sample .NET application is being monitored in the SigNoz ‘Services’ tab"/>
    <figcaption><i>The sample .NET application is being monitored in the SigNoz ‘Services’ tab</i></figcaption>
</figure>



</TabItem>
</Tabs>


## Troubleshooting

The console exporter prints data to the Console window. You can use it to verify if the instrumentation is properly set up or not.

Below are the steps on how to use the console exporter:

**Step 1. Adding the OpenTelemetry console exporter package:**

```bash
dotnet add package OpenTelemetry.Exporter.Console 
```

**Step 2. Adding the console exporter method:**

```csharp
using System.Diagnostics;
using OpenTelemetry.Exporter;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

var builder = WebApplication.CreateBuilder(args);

// Configure OpenTelemetry with tracing and auto-start.
builder.Services.AddOpenTelemetry()
    .ConfigureResource(resource => 
		resource.AddService(serviceName: "sample-net-app"))
    .WithTracing(tracing => tracing
        .AddAspNetCoreInstrumentation()
        .AddOtlpExporter(otlpOptions =>
        {
						//sigNoz Cloud Endpoint 
            otlpOptions.Endpoint = new Uri("https://ingest.{region}.signoz.cloud:443");

            otlpOptions.Protocol = OtlpExportProtocol.Grpc;
						
						//SigNoz Cloud account Ingestion key
            string headerKey = "signoz-access-token";
            string headerValue = "<SIGNOZ_INGESTION_KEY>";

            string formattedHeader = $"{headerKey}={headerValue}";
            otlpOptions.Headers = formattedHeader;
        })
				.AddConsoleExporter());

var app = builder.Build();

//The index route ("/") is set up to write out the OpenTelemetry trace information on the response:
app.MapGet("/", () => $"Hello World! OpenTelemetry Trace: {Activity.Current?.Id}");

app.Run();
```

Monitor the application on the console. You will be able to see the trace output as below:

```bash
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7062
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5017
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: C:\sample-app2
Activity.TraceId:            e1c2b70e9f39c6cc15d5d94b75412b70
Activity.SpanId:             17da84c0833e0075
Activity.TraceFlags:         Recorded
Activity.ActivitySourceName: Microsoft.AspNetCore
Activity.DisplayName:        /
Activity.Kind:               Server
Activity.StartTime:          2023-11-05T19:59:39.7875151Z
Activity.Duration:           00:00:00.2548901
Activity.Tags:
    net.host.name: localhost
    net.host.port: 7062
    http.method: GET
    http.scheme: https
    http.target: /
    http.url: https://localhost:7062/
    http.flavor: 2.0
    http.user_agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36
    http.status_code: 200
Resource associated with Activity:
    service.name: sample-app2
    service.instance.id: 44a34277-d46e-4758-b4f0-91b5a9435a4c
    telemetry.sdk.name: opentelemetry
    telemetry.sdk.language: dotnet
    telemetry.sdk.version: 1.6.0
```


<InstrumentationFAQ />
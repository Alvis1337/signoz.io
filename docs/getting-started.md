---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
slug: /getting-started
---

SigNoz is an open-source Application Performance Monitoring(APM) tool. It helps you monitor applications and troubleshoot problems. With SigNoz, you can monitor metrics(both application and infrastructure), track user requests across services and set alerts on metrics.

- monitor application metrics like latency, requests per sec, error rates
- track user requests across services
- monitor infrastructure metrics like CPU utilization, memory usage
- set alerts on metrics

<!-- Once you instrument your applications with OpenTelemetry libraries, you can start seeing RED metrics and detailed trace graphs in SigNoz. You can also go from metrics to traces to find the traces corresponding to anomalous metrics. -->

## Quick Start

### 1. Clone SigNoz repo

```
git clone https://github.com/SigNoz/signoz.git && cd signoz/deploy/
```

### 2. Run install script


```
./install.sh
```

<p></p>
<p></p>
<p></p>

:::note

Verify that you can open SigNoz dashboards in `port 3000` of the IP where you installed SigNoz

:::

### 3. Instrument your application

Follow instructions in [this section](/docs/instrumentation/overview/) to instrument your application and start sending data to SigNoz.


If you face any issues deploying SigNoz, check more detailed [requirements](/docs/deployment/requirement/) and [installation instructions](/docs/deployment/docker/)
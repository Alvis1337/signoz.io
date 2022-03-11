
module.exports = {
  docs: [
    {
      id: "introduction",
      type: "doc",
    },
    {
      type: 'category',
      label: 'Install',
      link: {
        type: 'generated-index',
        title: 'Install SigNoz',
        description: 'To install SigNoz, follow the instructions in the sections below.',
        slug: '/install',
      },
      items: [
        "install/docker-standalone",
        'install/docker-swarm',
        'install/kubernetes',
        'install/troubleshooting'
      ],
    },
    {
      label: "Instrument your app",
      type: "category",
      link: {
        type: 'generated-index',
        title: 'Instrument your Application',
        description: 'To instrument your applications and send data to SigNoz, follow the instructions in the sections below.',
        slug: '/instrumentation',
      },
      items: [
        'instrumentation/overview',
        {
          type: 'category',
          label: 'Python',
          items: [
            'instrumentation/fastapi',
            'instrumentation/python',
          ],
        },
        {
          type: 'category',
          label: 'JavaScript',
          items: [
            'instrumentation/nodejs',
            'instrumentation/nestjs',
          ],
        },
        'instrumentation/java',
        'instrumentation/golang',   
        'instrumentation/dotnet',
        'instrumentation/ruby-on-rails',
        'instrumentation/troubleshoot-instrumentation',
      ],
    },
    {
      type: 'category',
      label: 'Operate',
      link: {
        type: 'generated-index',
        title: 'Operate',
        description: 'The following sections provide an overview of the activities that are required to successfully operate SigNoz. Based on your environment, proceed to one of the sections below.',
        slug: '/operate',
      },
      items: [
        'operate/configuration',
        'operate/docker-standalone',
        'operate/docker-swarm',
        'operate/kubernetes'

      ],
    },
    {
      label: "Use SigNoz",
      type: "category",
      items: [
        'userguide/overview',
        'userguide/send-metrics',
        'userguide/navigate-user-interface',
        'userguide/metrics',
        'userguide/traces',
        'userguide/dashboards',
        'userguide/alerts-management',
        'userguide/retention-period',
        'userguide/service-map',
      ],
    },
    {
      label: "Tutorials",
      type: "category",
      link: {
        type: 'generated-index',
        title: 'Tutorials',
        description: 'SigNoz tutorials are step-by-step training exercises that guide you through monitoring your applications and infrastructure.',
        slug: '/tutorials',
      },
      items: [
        'tutorial/jvm-metrics',
        'tutorial/kubernetes-infra-metrics',
        'tutorial/mongodb-metrics',
      ],
    },
    {
      id: "architecture",
      type: "doc",
    },
    {
      id: "contributing",
      type: "doc",
    },
    {
      id: "community",
      type: "doc",
    },
    {
      id: "roadmap",
      type: "doc",
    },
    {
      id: "faq",
      type: "doc",
    },
    {
      label: "Others",
      type: "category",
      items: [
        'telemetry',
      ],
    },
  ]
}

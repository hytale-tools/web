import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import Header from '../components/Header'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'HytlTools',
      },
      {
        name: 'description',
        content: 'Check Hytale username availability instantly. Free tool to see if your desired username is taken or available.',
      },
      { 
        name: "keywords", 
        content: "hytale username checker, check hytale name availability, hytale username search, hytale name lookup tool, is my hytale username taken, hytale username finder, hytale account name checker, hytale username availability 2026, reserve hytale username, hytale og names available, hytale username lookup, hytale name availability tool, hytale name checker free, check if hytale username is taken, hytale username availability API, how to check hytale usernames, hytale 3 letter usernames available, check hytale username before release, hytale OG name checker, rare hytale usernames list, best hytale username tools, hytale username checker like namemc, hytale username search alternative, hytale.com username lookup",
      },
      { 
        name: "author", 
        content: "hytl.tools" 
      },
      { 
        name: "robots", 
        content: "index, follow" 
      },
      { 
        property: "og:type", 
        content: "website" 
      },
      { 
        property: "og:url", 
        content: "https://hytl.tools/" 
      },
      { 
        property: "og:title", 
        content: "Hytale Username Checker | hytl.tools" 
      },
      { 
        property: "og:description", 
        content: "Check Hytale username availability instantly. Free tool to see if your desired username is taken or available." 
      },
      { 
        property: "twitter:card", 
        content: "summary" 
      },
      { 
        property: "twitter:url", 
        content: "https://hytl.tools/" 
      },
      { 
        property: "twitter:title", 
        content: "Hytale Username Checker | hytl.tools" 
      },
      { 
        property: "twitter:description", 
        content: "Check Hytale username availability instantly. Free tool to see if your desired username is taken or available." 
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

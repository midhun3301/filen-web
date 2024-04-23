/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SyncsImport } from './routes/syncs'
import { Route as NotesImport } from './routes/notes'
import { Route as LoginImport } from './routes/login'
import { Route as ChatsImport } from './routes/chats'
import { Route as IndexImport } from './routes/index'
import { Route as SettingsTypeImport } from './routes/settings.$type'
import { Route as NotesUuidImport } from './routes/notes.$uuid'
import { Route as DriveSplatImport } from './routes/drive.$'
import { Route as ContactsTypeImport } from './routes/contacts.$type'
import { Route as ChatsUuidImport } from './routes/chats.$uuid'

// Create/Update Routes

const SyncsRoute = SyncsImport.update({
  path: '/syncs',
  getParentRoute: () => rootRoute,
} as any)

const NotesRoute = NotesImport.update({
  path: '/notes',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const ChatsRoute = ChatsImport.update({
  path: '/chats',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SettingsTypeRoute = SettingsTypeImport.update({
  path: '/settings/$type',
  getParentRoute: () => rootRoute,
} as any)

const NotesUuidRoute = NotesUuidImport.update({
  path: '/$uuid',
  getParentRoute: () => NotesRoute,
} as any)

const DriveSplatRoute = DriveSplatImport.update({
  path: '/drive/$',
  getParentRoute: () => rootRoute,
} as any)

const ContactsTypeRoute = ContactsTypeImport.update({
  path: '/contacts/$type',
  getParentRoute: () => rootRoute,
} as any)

const ChatsUuidRoute = ChatsUuidImport.update({
  path: '/$uuid',
  getParentRoute: () => ChatsRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/chats': {
      preLoaderRoute: typeof ChatsImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/notes': {
      preLoaderRoute: typeof NotesImport
      parentRoute: typeof rootRoute
    }
    '/syncs': {
      preLoaderRoute: typeof SyncsImport
      parentRoute: typeof rootRoute
    }
    '/chats/$uuid': {
      preLoaderRoute: typeof ChatsUuidImport
      parentRoute: typeof ChatsImport
    }
    '/contacts/$type': {
      preLoaderRoute: typeof ContactsTypeImport
      parentRoute: typeof rootRoute
    }
    '/drive/$': {
      preLoaderRoute: typeof DriveSplatImport
      parentRoute: typeof rootRoute
    }
    '/notes/$uuid': {
      preLoaderRoute: typeof NotesUuidImport
      parentRoute: typeof NotesImport
    }
    '/settings/$type': {
      preLoaderRoute: typeof SettingsTypeImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  ChatsRoute.addChildren([ChatsUuidRoute]),
  LoginRoute,
  NotesRoute.addChildren([NotesUuidRoute]),
  SyncsRoute,
  ContactsTypeRoute,
  DriveSplatRoute,
  SettingsTypeRoute,
])

/* prettier-ignore-end */

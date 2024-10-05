// Lista de patrones de IDP
export const IDPPATTERNS = [
  'auth0.com',
  'okta.com',
  'microsoftonline.com',
  'google.com',
  'amazonaws.com',
  'onelogin.com',
  'accounts.google.com',
  'login.microsoftonline.com'
]

// Lista de dominios SaaS
export const SAASDOMAIN = [
  'google.com',
  'slack.com',
  'salesforce.com',
  'dropbox.com',
  'zoom.us',
]

// Verificar si la URL contiene patrones de redirección a un IDP
export const IDPPATTERNS_REDIRECT = [
  'oauth',
  'auth',
  'redirect_uri',
  'token'
];

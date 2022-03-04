export enum AUTH_ERRORS {
  Email = 'Oops! You must use a valid email.',
  Password = 'Oops! Your password must be at least 7 characters long, and include at least a letter and a number.',
  Both = 'Your credentials are not valid. Your password must be at least 7 characters and include both a letter and a number. Your email must be a valid email.',
  Credentials = 'Shoot, looks like your email or password didn\'t match',
  Default = 'Shoot, something went wrong. Please try again.'
}
# CHANGELOG

## 0.2.0-alpha

Features:

  - add support for SVN sources -> [95f32s5b](http://www.google.com)
  - add metadata allowed_push_host to new gem template -> [95f32s5b](http://www.google.com)
  - adds a `--no-install` flag to `bundle package` -> [95f32s5b](http://www.google.com)

Security:

  - Fix for CVE-2013-0334, installing gems from an unexpected source -> [95f32s5b](http://www.google.com)

Fix:

  - warn on ambiguous gems available from more than one source -> [95f32s5b](http://www.google.com)

Bugfixes:

  - require openssl explicitly to fix rare HTTPS request failures -> [95f32s5b](http://www.google.com)

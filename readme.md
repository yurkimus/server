# Server utilities

## Exports

### response

```
response = (headers: Headers, response: Response) =>
  | TypeError
  | Response
```

### exception

```
exception = (reason: any) => Response
```

### notFound

```
exception = () => Response
```

# eva-config-picker-customer



<!-- Auto Generated Below -->


## Events

| Event            | Description                                     | Type                           |
| ---------------- | ----------------------------------------------- | ------------------------------ |
| `endPointSelect` | This will emit whenever an endpoint is selected | `CustomEvent<BaseEnvironment>` |


## Dependencies

### Used by

 - [eva-config-picker](../picker)

### Depends on

- [eva-config-picker-spinner](../picker-spinner)

### Graph
```mermaid
graph TD;
  eva-config-picker-customer --> eva-config-picker-spinner
  eva-config-picker --> eva-config-picker-customer
  style eva-config-picker-customer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

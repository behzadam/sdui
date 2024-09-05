# SDUI: Server-Driven UI with Conditional Form Builder

A React & Next.js project demonstrating the implementation of Server-Driven UI with a dynamic form builder based on a JSON configuration file. [What is Server-Driven UI?](https://www.judo.app/blog/server-driven-ui)

## Features

- Dynamic Form Generation: Creates forms based on a JSON definition, allowing for flexible customization and updates without recompiling the frontend.
- Conditional Logic: Implements conditional rendering and validation rules based on user input, providing a more interactive and user-friendly experience.
- JSON Configuration: Uses a JSON file to define form structure, fields, validation rules, and conditional logic.

### JSON Configuration Sample

```json
{
  "label": "Conditional field",
  "type": "text",
  "name": "name",
  "uid": "bd90f44a-d479-49ae-ad66-c2c475daa66b",
  "value": null,
  "logic": {
    "if": "Any",
    "conditions": [
      {
        "when": "f61233e8-565e-43d0-9c14-7d7f220c6020",
        "is": "EqualTo",
        "value": "2"
      },
      {
        "when": "f61233e8-565e-43d0-9c14-7d7f220c6020",
        "is": "EqualTo",
        "value": "4"
      }
    ]
  }
}
```

## Demo

https://github.com/user-attachments/assets/9a6bae57-2aac-4d78-84c0-88c3827080f0

## License

This project is licensed under the MIT License.

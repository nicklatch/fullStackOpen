# 0.4: New Note Diagram

```mermaid
sequenceDiagram
    participant client
    participant server
    
    client->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server->>client: server asks for new GET request
    deactivate server

    client->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server->>client: HTML Document
    deactivate server

    client->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>client: CSS main.css
    deactivate server

    client->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server->>client: JS main.js
    deactivate server

    Note right of client: The client starts executing main.js's code that fetches the JSON from the server

    client->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server->>client: JSON  data.json
    deactivate server

    Note right of client: The client executes the callback function that renders the notes
```

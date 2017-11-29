| Name    | Path  | HTTP Verb | Purpose  | Mongoose Method |
|---------|---|---|---|---|
| Index   | /projects | GET | List all projects | Project.create() |
| New     | /projects/new | GET | Show new projects form | N/A |
| Create  | /projects | POST | Create new project, then redirect | Project.create()  |
| Show    | /projects/:id | GET | Show info about one specific project | Project.findById() |
| Edit    | /projects/:id/edit | GET | Show edit form for one project | Project.findById()|
| Update  | /projects/:id | PUT | Update a project, then redirect | Project.findByIdAndUpdate() |
| Destroy | /projects/:id | DELETE | Delete a project, then redirect | Project.findByIdAndRemove() |

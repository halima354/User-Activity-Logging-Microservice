### User Activity Logging Microservice (Kafka & MongoDB)
This project is a high-performance Microservice designed to asynchronously log and track user interactions (User Activities). The service is built upon Domain-Driven Design (DDD) principles and leverages Apache Kafka as a message broker to ensure rapid API response times, with MongoDB used as the persistent storage for activity logs.

The project is fully containerized and prepared for deployment using Docker and Kubernetes.

### Project Architecture and Design Choices (Write-up)
The system is engineered based on the following principles to ensure resilience, and scalability:

1. Decoupling Asynchronous Tasks via Kafka
Choice: Utilizing Apache Kafka as a crucial intermediary layer between the REST API and the MongoDB database.

Explanation: When a user sends a POST /user/activities request, the API (Producer) immediately dispatches the activity message to Kafka and returns a successful response to the user. The operation of saving the data is handed off to the Kafka Consumer, which processes the messages and persists them to MongoDB in the background. This decoupling ensures the API's response time is extremely fast, as it does not wait for database latency.

2. Code Organization (Domain-Driven Design - DDD)
Choice: Strict separation of concerns across Controller, Service, and DBService (Repository) layers.

Explanation: The Service layer encapsulates all Business Logic (e.g., handling filtering and pagination logic), while the Controller layer strictly manages request/response interaction, and the DBService handles direct CRUD operations with MongoDB. This structure significantly enhances code maintainability, testability, and clarity.

3. Containerization with Docker
Choice: Utilizing Docker and Docker Compose for development and testing.

Explanation: Docker ensures that the entire application stack (Node.js App, Kafka, Zookeeper, and Mongo) runs consistently across any environment, eliminating "it works on my machine" issues. Docker Compose is used to orchestrate the services locally for easy development setup.

### Local Setup and Run Instructions (Docker Compose)
Prerequisites:
Docker

Docker Compose

 *Note for Docker Toolbox Users*
If you are using Docker Toolbox, you must set up the environment variables in your terminal before running any Docker commands:

Bash

eval "$(docker-machine env default)"
Use the IP provided by docker-machine ip default instead of localhost when accessing the API.

Steps to Run:
Clone the Repository:

Bash

git clone [Your-Repo-URL]
cd task
Environment Configuration (.env.dev): Ensure you have a src/config/.env.dev file configured for local operation.

Ini, TOML

PORT 
MOOD 
DB_URI 
PAGE
SIZE
KAFKA_BROKER
ZOOKEEPER_PORT
Build and Run the Full Stack: This command builds the Node.js application image and starts all services (Mongo, Zookeeper, Kafka, App) in the background.

Bash

docker-compose up --build -d
🌐 API Endpoints for Testing
The Microservice is accessible on port 3000. (e.g., http://DOCKER_MACHINE_IP:3000/user/activities)

1. Log User Activity (Producer)
Endpoint: POST /user/activities

Description: Sends the activity data to the Kafka Topic (user-activities).

Body (JSON):

JSON

{
    "userId": "user-123",
    "action": "ITEM_VIEWED",
    "metadata": {
        "itemId": "sku-456",
        "device": "mobile"
    }
}
2. Retrieve Activity Logs (Consumer/DB)
Endpoint: GET /user/activities

Description: Retrieves activities from MongoDB, supporting Pagination and Filtering.

Query Parameters (Optional): | Parameter | Description | Example | | :--- | :--- | :--- | | page | Page number | ?page=2 | | size | Results per page | ?size=50 | | userId | Filter by User ID | ?userId=user-123 | | action | Filter by activity type | ?action=ITEM_VIEWED | | from | Start date (time filter) | ?from=2024-01-01 | | to | End date (time filter) | ?to=2024-12-31 |

Example:

/user/activities?userId=user-123&action=ITEM_VIEWED&page=1&size=20

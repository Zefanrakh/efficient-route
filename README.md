# Application Setup Guide

This document provides instructions for setting up and running the application.

---

## Prerequisites

Ensure the following tools are installed on your machine:

- **Node.js** (Version 16 or later)
- **npm** (Installed with Node.js) or **yarn**
- **Docker** (optional, if using a containerized environment)
- **PostgreSQL** or another database supported by the application

---

## Installation

Follow these steps to install the application:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repository-url.git
   cd your-repository-folder
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration:**
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with your environment-specific variables, such as database credentials and API keys.

4. **Database Setup:**
   - Run the migrations to initialize the database:
     ```bash
     npm run migrate
     # or
     yarn migrate
     ```
   - Optionally, seed the database:
     ```bash
     npm run seed
     # or
     yarn seed
     ```

---

## Running the Application

### Using Node.js

1. **Start the Development Server:**
   ```bash
   npm run start:dev
   # or
   yarn start:dev
   ```

2. **Access the Application:**
   - Open your browser and navigate to:
     ```
     http://localhost:3000
     ```

### Using Docker

1. **Build and Start the Container:**
   ```bash
   docker-compose up --build
   ```

2. **Access the Application:**
   - Open your browser and navigate to:
     ```
     http://localhost:3000
     ```

---

## Running Tests

To run the test suite, use:

- **Unit Tests:**
  ```bash
  npm run test
  # or
  yarn test
  ```

- **End-to-End Tests:**
  ```bash
  npm run test:e2e
  # or
  yarn test:e2e
  ```

- **Test Coverage:**
  ```bash
  npm run test:coverage
  # or
  yarn test:coverage
  ```

---

## Linting and Formatting

To ensure code quality and consistency, use the following commands:

- **Lint the Code:**
  ```bash
  npm run lint
  # or
  yarn lint
  ```

- **Fix Linting Issues:**
  ```bash
  npm run lint:fix
  # or
  yarn lint:fix
  ```

- **Format the Code:**
  ```bash
  npm run format
  # or
  yarn format
  ```

---

## Deployment

1. **Build the Application:**
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Run the Production Server:**
   ```bash
   npm run start:prod
   # or
   yarn start:prod
   ```

---

## Troubleshooting

- **Port Conflicts:**
  If the application cannot start due to a port conflict, update the port in the `.env` file.

---

If you encounter any issues, refer to the project documentation or contact the maintainer for support.

<br/>
<br/>
<br/>

# API: Routes Management

## End-point: Get Roads
### Method: GET
>```
>{{base_url}}/road
>```
### Response: 200
```json
[
    {
        "id": 1,
        "name": "NE 42nd Way",
        "connections": [
            {
                "road_id": 2,
                "distance_value": 1
            }
        ],
        "vehicles": []
    },
    {
        "id": 2,
        "name": "NE 42nd St",
        "connections": [
            {
                "road_id": 3,
                "distance_value": 1
            },
            {
                "road_id": 5,
                "distance_value": 1
            },
            {
                "road_id": 6,
                "distance_value": 1
            },
            {
                "road_id": 8,
                "distance_value": 1
            },
            {
                "road_id": 9,
                "distance_value": 1
            }
        ],
        "vehicles": []
    },
    {
        "id": 3,
        "name": "201st Ave NE",
        "connections": [
            {
                "road_id": 4,
                "distance_value": 1
            },
            {
                "road_id": 5,
                "distance_value": 1
            }
        ],
        "vehicles": []
    },
    {
        "id": 4,
        "name": "NE 44th St",
        "connections": [
            {
                "road_id": 5,
                "distance_value": 1
            }
        ],
        "vehicles": []
    },
    {
        "id": 5,
        "name": "202nd Ave NE",
        "connections": [],
        "vehicles": []
    },
    {
        "id": 6,
        "name": "NE 39th St West",
        "connections": [
            {
                "road_id": 7,
                "distance_value": 1
            }
        ],
        "vehicles": []
    },
    {
        "id": 7,
        "name": "NE 39th Ln",
        "connections": [],
        "vehicles": []
    },
    {
        "id": 8,
        "name": "203rd Ave NE",
        "connections": [
            {
                "road_id": 9,
                "distance_value": 1
            },
            {
                "road_id": 10,
                "distance_value": 2
            }
        ],
        "vehicles": []
    },
    {
        "id": 9,
        "name": "NE 39th St East",
        "connections": [
            {
                "road_id": 10,
                "distance_value": 1
            }
        ],
        "vehicles": [
            {
                "vehicle_id": 1,
                "amount": 2
            }
        ]
    },
    {
        "id": 10,
        "name": "204th Ave NE",
        "connections": [
            {
                "road_id": 11,
                "distance_value": 1
            },
            {
                "road_id": 12,
                "distance_value": 1
            }
        ],
        "vehicles": []
    },
    {
        "id": 11,
        "name": "206th PI NE",
        "connections": [],
        "vehicles": []
    },
    {
        "id": 12,
        "name": "205th PI NE",
        "connections": [],
        "vehicles": []
    }
]
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Vehicles
### Method: GET
>```
>{{base_url}}/vehicle
>```
### Response: 200
```json
[
    {
        "id": 1,
        "name": "Bike",
        "congestion_value": 1
    },
    {
        "id": 2,
        "name": "Car",
        "congestion_value": 2
    },
    {
        "id": 3,
        "name": "Bus",
        "congestion_value": 4
    }
]
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Congestion
### Method: POST
>```
>{{base_url}}/vehicle/congestion
>```
### Body (**raw**)

```json
{
    "congestions": [{
        "road_id": 9,
        "vehicles": [{
            "vehicle_id":  1,
            "amount": 2
        }]
    }]
}
```

### Response: 201
```json
[
    {
        "id": 1,
        "name": "NE 42nd Way",
        "connections": [
            {
                "road_id": 2,
                "distance_value": 1
            }
        ],
        "vehicles": []
    },
    {
        "id": 2,
        "name": "NE 42nd St",
        "connections": [
            {
                "road_id": 3,
                "distance_value": 1
            },
            {
                "road_id": 5,
                "distance_value": 1
            },
            {
                "road_id": 6,
                "distance_value": 1
            },
            {
                "road_id": 8,
                "distance_value": 1
            },
            {
                "road_id": 9,
                "distance_value": 1
            }
        ],
        "vehicles": []
    },
    {
        "id": 3,
        "name": "201st Ave NE",
        "connections": [
            {
                "road_id": 4,
                "distance_value": 1
            },
            {
                "road_id": 5,
                "distance_value": 1
            }
        ],
        "vehicles": []
    },
    {
        "id": 4,
        "name": "NE 44th St",
        "connections": [
            {
                "road_id": 5,
                "distance_value": 1
            }
        ],
        "vehicles": []
    },
    {
        "id": 5,
        "name": "202nd Ave NE",
        "connections": [],
        "vehicles": []
    },
    {
        "id": 6,
        "name": "NE 39th St West",
        "connections": [
            {
                "road_id": 7,
                "distance_value": 1
            }
        ],
        "vehicles": []
    },
    {
        "id": 7,
        "name": "NE 39th Ln",
        "connections": [],
        "vehicles": []
    },
    {
        "id": 8,
        "name": "203rd Ave NE",
        "connections": [
            {
                "road_id": 9,
                "distance_value": 1
            },
            {
                "road_id": 10,
                "distance_value": 2
            }
        ],
        "vehicles": []
    },
    {
        "id": 9,
        "name": "NE 39th St East",
        "connections": [
            {
                "road_id": 10,
                "distance_value": 1
            }
        ],
        "vehicles": [
            {
                "vehicle_id": 1,
                "amount": 2
            }
        ]
    },
    {
        "id": 10,
        "name": "204th Ave NE",
        "connections": [
            {
                "road_id": 11,
                "distance_value": 1
            },
            {
                "road_id": 12,
                "distance_value": 1
            }
        ],
        "vehicles": []
    },
    {
        "id": 11,
        "name": "206th PI NE",
        "connections": [],
        "vehicles": []
    },
    {
        "id": 12,
        "name": "205th PI NE",
        "connections": [],
        "vehicles": []
    }
]
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Efficient Routes
### Method: GET
>```
>{{base_url}}/road/route?start=1&end=11
>```
### Query Params

|Param|value|
|---|---|
|start|1|
|end|11|


### Response Before Update Congestion To NE 39th St East: 200
```json
[
    "NE 42nd Way",
    "NE 42nd St",
    "NE 39th St East",
    "204th Ave NE",
    "206th PI NE"
]
```

###  Response After Update Congestion To NE 39th St East: 200
```json
[
    "NE 42nd Way",
    "NE 42nd St",
    "203rd Ave NE",
    "204th Ave NE",
    "206th PI NE"
]
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get All Congestions
### Method: GET
>```
>{{base_url}}/vehicle/congestion
>```
### Response: 200
```json
[
    {
        "road_id": 9,
        "vehicles": [
            {
                "vehicle_id": 1,
                "amount": 2
            }
        ]
    }
]
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)





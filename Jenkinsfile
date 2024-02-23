pipeline {
    
    agent none

    environment {
        DOCKER_HUB_USERNAME = 'chung123abc'
        DOCKER_HUB_PASSWORD = '123456a@@'
        DOCKER_IMAGE_NAME = "chung123abc/web-anime"
        DOCKER_IMAGE = "web-anime"
    }

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:14.21-alpine'
                    args '-u root:root'
                }
            }
            steps {
                sh 'node -v'
                sh 'npm install'
            }
        }
        stage('Test') {
            agent {
                docker {
                    image 'node:14.21-alpine'
                    args '-u root:root'
                }
            }
            steps {
                sh 'npm run test'
            }
        }
        stage('Build Docker Image') {
            agent any
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE} .'
                }
            }
        }
        stage('Login Docker Hub') {
            agent any
            steps {
                script {
                    sh 'docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}'
                }
            }
        }
        stage('Push Image to Hub') {
            agent any
            steps {
                sh 'docker tag ${DOCKER_IMAGE} ${DOCKER_IMAGE_NAME}:v1.0'
                sh 'docker push ${DOCKER_IMAGE_NAME}:v1.0'
                
                sh 'docker rmi ${DOCKER_IMAGE} -f'
                sh 'docker rmi ${DOCKER_IMAGE_NAME}:v1.0 -f'
            }
        }

    }
    post {
      always {
        echo 'Done'
      }
    }
}
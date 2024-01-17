pipeline {
    
    agent none
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
                    sh 'docker build -t web-anime .'
                }
            }
        }
        stage('Login Docker Hub') {
            agent any
            steps {
                script {
                    sh 'docker login -u chung123abc -p 123456a@@'
                }
            }
        }
        stage('Push Image to Hub') {
            agent any
            steps {
                sh 'docker tag web-anime chung123abc/web-anime:v1.0'
                sh 'docker push chung123abc/web-anime:v1.0'
            }
        }
        // stage('Deploy to K8s') {
        //     agent any
        //     steps{
        //         script {
        //             sh "cat /home/chung/jenkins/k8s_config/mongo.yaml"
        //             sh "kubectl apply -f /home/chung/jenkins/k8s_config/mongo.yaml"  
        //         }
        //     }
        // }
    }
    post {
      always {
        echo 'Done'
      }
    }
}
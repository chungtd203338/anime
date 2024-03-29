def githubUser = 'chungtd203338'

pipeline {
    
    agent any
    tools {
        nodejs 'node16'
        jdk 'jdk17'
    }

    environment {
        github = 'github-account'
        argocdCredential = 'argocd-account'
        DOCKER_HUB_USERNAME = 'chung123abc'
        DOCKER_IMAGE_NAME = "web-anime"
        GIT_HUB_USER = 'chungtd203338'
        GIT_REPO = "https://github.com/chungtd203338/anime-cd.git"
        GIT_BRANCH = "main"
        VERSION = "v1.${BUILD_NUMBER}"
        GIT_EMAIL = "chungfaker@gmail.com"
        ARGOCD_USERNAME = 'admin'
        ARGOCD_PASSWORD = 'VfNSX5CWZi1nFZHc'
        ARGOCD_SERVER = 'localhost:9000'
    }

    stages {

        stage('clean workspace'){
            steps{
                cleanWs()
            }
        }

        stage('Checkout from Git'){
            steps{
                git branch: 'main', url: 'https://github.com/chungtd203338/anime.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'node -v'
                sh 'npm install'
            }
        }

        stage('Build and Push Image to Docker Hub') {
            steps {
                script{
                   withDockerRegistry(credentialsId: 'docker', toolName: 'docker'){
                        sh 'ls'
                        sh 'docker build -t ${DOCKER_HUB_USERNAME}/${DOCKER_IMAGE_NAME}:${VERSION} .'
                        sh 'docker push ${DOCKER_HUB_USERNAME}/${DOCKER_IMAGE_NAME}:${VERSION}'
                        sh 'docker rmi ${DOCKER_HUB_USERNAME}/${DOCKER_IMAGE_NAME}:${VERSION} -f'
                    }
                }
            }
        }

        stage('Update Version App') {
            steps {
                withCredentials([usernamePassword(credentialsId: argocdCredential, usernameVariable: 'ARGOCD_USERNAME', passwordVariable: 'ARGOCD_PASSWORD')]) {
                    sh "argocd login ${ARGOCD_SERVER} --insecure --username $ARGOCD_USERNAME --password $ARGOCD_PASSWORD"
                    script {
                        // sh "pwd"
                        sh '''
                            #!/bin/bash
                            argocd app create anime-app --repo https://github.com/chungtd203338/anime-chart.git --path anime-app-helm --helm-set app.image=${DOCKER_HUB_USERNAME}/web-anime:${VERSION} --dest-namespace anime --dest-server https://kubernetes.default.svc --sync-policy automated --auto-prune --self-heal --upsert
                        '''
                    }
                }
            }
        }

    }
}
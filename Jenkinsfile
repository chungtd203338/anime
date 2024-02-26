pipeline {
    
    agent none

    environment {
        DOCKER_HUB_USERNAME = 'chung123abc'
        DOCKER_IMAGE_NAME = "chung123abc/web-anime"
        DOCKER_IMAGE = "web-anime"
        GIT_HUB_USERNAME = "chungtd203338"
        GIT_REPO_CD = "https://github.com/chungtd203338/anime-cd.git"
        GIT_BRANCH = "main"
        VERSION = "v1.${BUILD_NUMBER}"
        GIT_EMAIL = "chungfaker@gmail.com"
        GITHUB = "test2"
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
                sh 'docker tag ${DOCKER_IMAGE} ${DOCKER_IMAGE_NAME}:${VERSION}'
                sh 'docker push ${DOCKER_IMAGE_NAME}:${VERSION}'
                
                sh 'docker rmi ${DOCKER_IMAGE} -f'
                sh 'docker rmi ${DOCKER_IMAGE_NAME}:${VERSION} -f'
            }
        }

        // stage('Update Git ArgoCD') {
        //     agent any
        //     steps {
        //         script {
        //             catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE'){
        //                 withCredentials([usernamePassword(credentialsId: 'github', passwordVariable: 'GIT_HUB_PASSWORD', usernameVariable: 'GIT_HUB_USERNAME')]){
        //                     sh "git config user.email chungfaker@gmail.com"
        //                     sh "git config user.name 'chungtd203338'"
        //                     sh "git clone ${GIT_REPO_CD} --branch ${GIT_BRANCH}"
        //                     sh "cd argocd"
        //                     sh "sed -i 's|  image: .*|  image: "chung123abc/web-anime:${VERSION}"|' argocd/web.yaml"
        //                     sh "git add ."
        //                     sh "git commit -m 'Update to version ${VERSION}'"
        //                     sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/chungtd203338/anime-cd.git HEAD:main"
        //                 }
        //             }
        //         }
        //     }
        // }

        stage('Update value in yaml file in github') {
            agent any
            steps {
                srcipt {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE'){
                        withCredentials([usernamePassword(credentialsId: 'GITHUB', passwordVariable: 'GIT_HUB_PASSWORD', usernameVariable: 'GIT_HUB_USERNAME')]) {
                        sh """#!/bin/bash
                            git clone ${GIT_REPO_CD} --branch ${GIT_BRANCH}
                            git config --global user.email ${GIT_EMAIL}
                            cd argocd
                            sed -i 's|  image: .*|  image: "chung123abc/web-anime:${VERSION}"|' argocd/web.yaml
                            git add . ; git commit -m "Update to version ${VERSION}" ; git push https://${GIT_HUB_USERNAME}:${GIT_HUB_PASSWORD}@github.com/chungtd203338/anime-cd.git HEAD:main
                            cd ..
                            """		
                        }
                    }
                }
            }
        }

    }
}
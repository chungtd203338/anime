def githubUser = 'chungtd203338'

pipeline {
    
    agent any
    tools {
        nodejs 'node16'
        jdk 'jdk17'
    }

    environment {
        github = 'github-account'
        DOCKER_HUB_USERNAME = 'chung123abc'
        DOCKER_IMAGE_NAME = "web-anime"
        GIT_HUB_USER = 'chungtd203338'
        GIT_REPO = "https://github.com/chungtd203338/anime-cd.git"
        GIT_BRANCH = "main"
        VERSION = "v1.${BUILD_NUMBER}"
        GIT_EMAIL = "chungfaker@gmail.com"
    }

    stages {

        // stage('clean workspace'){
        //     steps{
        //         cleanWs()
        //     }
        // }

        // stage('Checkout from Git'){
        //     steps{
        //         git branch: 'main', url: 'https://github.com/chungtd203338/anime.git'
        //     }
        // }

        // stage('Install Dependencies') {
        //     steps {
        //         sh 'node -v'
        //         sh 'npm install'
        //     }
        // }

        // // stage('Login Docker Hub') {
        // //     steps {
        // //         script {
        // //             sh 'docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}'
        // //         }
        // //     }
        // // }

        // stage('Build and Push Image to Docker Hub') {
        //     steps {
        //         script{
        //            withDockerRegistry(credentialsId: 'docker', toolName: 'docker'){
        //                 sh 'ls'
        //                 sh 'docker build -t ${DOCKER_HUB_USERNAME}/${DOCKER_IMAGE_NAME}:${VERSION} .'
        //                 sh 'docker push ${DOCKER_HUB_USERNAME}/${DOCKER_IMAGE_NAME}:${VERSION}'
        //                 sh 'docker rmi ${DOCKER_HUB_USERNAME}/${DOCKER_IMAGE_NAME}:${VERSION} -f'
        //             }
        //         }
        //     }
        // }

        stage('Update Version App') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: github, passwordVariable: 'GIT_HUB_PASSWORD', usernameVariable: 'GIT_HUB_USER')]) {
                    // sh """#!/bin/bash
                    //     git clone ${GIT_REPO} --branch ${GIT_BRANCH}
                    //     git config --global user.email ${GIT_EMAIL}
                    //     pwd
                    //     ls
                    //     cd argocd
                    //     """		
                    // }
                    sh """#!/bin/bash
                        git clone ${GIT_REPO} --branch ${GIT_BRANCH}
                        git config --global user.email ${GIT_EMAIL}
                        cd anime-cd/argocd
                        ls
                        sed -i 's|  image: .*| image: "chung123abc/web-anime:${VERSION}"|' web.yaml
                        cd ..
                        git add . ; git commit -m "Update to version ${VERSION}" 
                        git push https://${GIT_HUB_USER}:${GIT_HUB_PASSWORD}@github.com/chungtd203338/anime-cd.git HEAD:main
                        """		
                    }
                }
            }
        }

    }
}
pipeline {
    
    agent {
        docker { image 'node:14.21-alpine' }
    } 
    stages {
        stage('Build') {
            steps {
                sh 'node -v'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
        // stage('Build') { 
        //     steps {
        //         sh './jenkins/scripts/deliver.sh' 
        //         input message: 'Finished using the web site? (Click "Proceed" to continue)' 
        //         sh './jenkins/scripts/kill.sh' 
        //     }
        // }
    }
    post {
      always {
        echo 'abcxyz'
      }
    }
}
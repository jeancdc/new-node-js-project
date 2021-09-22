pipeline {
    agent any
    tools {nodejs "NodeJS"}
    stages {
        stage('Node.js version') {
            steps {
                sh 'node -v'
            }
        }
        stage('build') {
            steps {
                echo 'Just a test'
            }
        }
    }
}

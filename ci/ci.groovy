pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                echo 'Just a test'
            }
        }
    }
}

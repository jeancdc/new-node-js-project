pipeline {
    agent any
    tools {nodejs "NodeJS"}
    stages {
        stage('Node.js version') {
            steps {
                echo '### Display Node.js version ###'
                sh 'node -v'
            }
        }
        stage('Install libraries') {
            steps {
                echo '### Install the libraries ###'
                sh 'yarn install --frozen-lockfile'
            }
        }
        stage('Build') {
            steps {
                echo '### Build the project ###'
                sh 'yarn build'
            }
        }
        stage('Unit tests') {
            steps {
                echo '### Execute the unit tests ###'
                sh 'yarn test'
            }
        }
    }
}

node('node') {

    currentBuild.result = "SUCCESS"

    try {

       stage('Checkout'){

          checkout scm
       }

       stage('Test'){

         env.NODE_ENV = "test"

         print "Environment will be : ${env.NODE_ENV}"

         sh 'node -v'
         sh 'npm prune'
         sh 'npm install'
         sh 'npm run test'

       }

    }
    catch (err) {

        currentBuild.result = "FAILURE"

            mail body: "project build error is here: ${env.BUILD_URL}" ,
            from: 'rproenza86@gmail.com',
            replyTo: 'rproenza86@gmail.com',
            subject: 'rrp-services-prpl project build failed',
            to: 'rproenza86@gmail.com'

        throw err
    }

}
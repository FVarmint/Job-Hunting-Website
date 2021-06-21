const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const job = require('../models/job')
const user = require('../models/user');
const portfolio = require("../models/portfolio")
const bcrypt = require('bcrypt')
// const admin = new AdminBro(AdminBroOptions);

const mongoose = require('mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

const admin = mongoose.model('admin', {
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'restricted'], required: true },
})

// const adminBro = new AdminBro({
//   databases: [mongoose],
//   resource:[user , job , portfolio , admin],
//   rootPath: '/admin',
// })

const adminBro = new AdminBro({
  databases:[mongoose],
  resources: [{
    resource: user,
    options: {
      properties: {
        encryptedPassword: {
          isVisible: false,
        },
        password: {
          type: 'string',
          isVisible: {
            list: false, edit: true, filter: false, show: false,
          },
        },
      },
      actions: {
        new: {
          before: async (request) => {
            if(request.payload.password) {
              request.payload = {
                ...request.payload,
                encryptedPassword: await bcrypt.hash(request.payload.password, 8),
                password: undefined,
              }
            }
            return request
          },
        }
      }
    }
  }],
  rootPath: '/admin',
  dashboard: {
    handler: async () => {
      return { some: 'output' }
    },
    component: AdminBro.bundle('./my-dashboard-component')
  },
  branding:{
    logo:'https://umbeo.com/wp-content/uploads/2021/03/logo.png',
    companyName:'Umbeo Technologies'
  }
})

// const ADMIN = {
//   email: process.env.ADMIN_EMAIL || 'admin@umbeo.com',
//   password: process.env.ADMIN_PASSWORD || 'adminpassword',
// }

// const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
//   cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
//   cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
//   authenticate: async (email, password) => {
//     if (email === ADMIN.email && password === ADMIN.password) {
//       return ADMIN
//     }
//     return null
//   }
// })

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const Admin = await admin.findOne({email});
    // console.log(User);
    if(!Admin){
        throw new Error("Unable to login");
    }
    bcrypt.compare(password, Admin.password, (err, result)=> {
        if(result==true){
            return Admin;
        }
        else{
            return err;
        }
    });
    const Password = await admin.findOne({password});
    return Admin;
  },
  cookiePassword: 'some-secret-password-used-to-secure-cookie',
})


// const adminBroOptions = {
//   databases: [],
//   resources: [],
//   dashboard: {
//     handler: async () => {
//       return { some: 'output' }
//     },
//     component: AdminBro.bundle('./my-dashboard-component')
//   },
// }

module.exports = router
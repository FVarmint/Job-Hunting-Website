const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const job = require('../models/job')
const user = require('../models/user');
const portfolio = require("../models/portfolio")

const mongoose = require('mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
  databases: [mongoose],
  resource:[user , job , portfolio],
  rootPath: '/admin',
  dashboard: {
    handler: async () => {
    return { some: 'output' }
  },
  component: AdminBro.bundle('./my-dashboard-component')
},
})


const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@umbeo.com',
  password: process.env.ADMIN_PASSWORD || 'adminpassword',
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
  authenticate: async (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      return ADMIN
    }
    return null
  }
})


module.exports = router
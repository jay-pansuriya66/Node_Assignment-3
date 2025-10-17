const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  baseSalary: {
    type: Number,
    required: true,
  },
  allowances: {
    type: Number,
    default: 0,
  },
  deductions: {
    type: Number,
    default: 0,
  },
  salary: {
    type: Number,
    required: true,
  },
  joiningDate: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
}, {
  timestamps: true,
});

// Generate Employee ID automatically
employeeSchema.pre('save', async function(next) {
  if (!this.empId) {
    const count = await mongoose.model('Employee').countDocuments();
    this.empId = `EMP${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Calculate salary before saving
employeeSchema.pre('save', function(next) {
  this.salary = this.baseSalary + this.allowances - this.deductions;
  next();
});

// Hash password before saving
employeeSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
employeeSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile
employeeSchema.methods.getPublicProfile = function() {
  return {
    empId: this.empId,
    name: this.name,
    email: this.email,
    department: this.department,
    position: this.position,
    salary: this.salary,
    baseSalary: this.baseSalary,
    allowances: this.allowances,
    deductions: this.deductions,
    joiningDate: this.joiningDate,
    phone: this.phone,
    address: this.address,
    status: this.status,
  };
};

module.exports = mongoose.model('Employee', employeeSchema);

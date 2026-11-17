import bcrypt from 'bcrypt';
import readline from 'readline';

// Create an input and output interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask the user to enter an Admin password
rl.question('Enter your Admin password: ', async (password) => {

  // Check if the password meets the requirements
  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[^a-zA-Z0-9\s]/.test(password)
  ) {
    console.log('Password must have:');
    console.log('- At least 8 characters');
    console.log('- At least one uppercase letter');
    console.log('- At least one special character!');
  } else {

    // Convert the password into a secure bcrypt hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Display the hashed password
    console.log('\nYour bcrypt hash:\n');
    console.log(hashedPassword);
  }

  // Close the input interface
  rl.close();
});
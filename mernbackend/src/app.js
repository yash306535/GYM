const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const connectDb = require("./db/conn");
const Register = require('./models/registers');
const Trainer_Register=require('./models/Trainer_register');
const bcrypt = require('bcrypt');

const port = 3000;
const static_path = path.join(__dirname, "../public");

// Fix the typo in the template path
const template_path = path.join(__dirname, "../templates");
const partial_path = path.join(__dirname, "../templates/partials");

// Set up static files and view engine
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes

//user register

app.post("/index", async (req, res) => {

    try {
  
        const { email_id, phone_no, password, confirmpassword } = req.body;

        if (password === confirmpassword) {
            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new Register document
            const newRegister = new Register({
                email_id: req.body.email_id,
                phone_no: req.body.phone_no,
                password: hashedPassword,
                confirmpassword: req.body.password,
            });

            // Save the document to the database
            const registered = await newRegister.save();

            // Check if the registration was successful
            if (registered) {
                console.log("User registration done");
                // Render the index view if registration is successful
               return res.status(201).render("login");
            } else {
                console.log("User registration failed");
                return res.status(500).send("User registration failed");
            }
        } else {
           return res.status(400).send("Passwords do not match");
        }
    } catch (error) {
        console.error(error);
        
        return res.status(500).send("Internal Server Error");
    }
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/userDashboard", (req, res) => {
    res.render("userdashboard");
});

app.get("/trainerdashboard", (req, res) => {
    res.render("trainerdashboard");
});

//user login
app.post("/login", async (req, res) => {
    
    try {
        const { email_id, password } = req.body;
  

        // Check if the email exists in the database
        const user = await Register.findOne({ email_id: email_id });

        if (user) {
            // Compare the entered password with the hashed password in the database
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (isPasswordMatch) {
                // Passwords match, login successful
                console.log("Login successful");
          
                // return res.status(200).render("userDashboard");
                return res.redirect("/userDashboard?username=" + email_id);
                // Redirect to the dashboard or any desired page
            } else {
                // Passwords do not match, login failed
                console.log("Incorrect password");
                return res.status(401).send("Incorrect password");
            }
        } else {
            // User with the provided email does not exist
            console.log("User not found");
            return res.status(404).send("User ntot found");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

app.get("/index2", (req, res) => {
    res.render("index2");
});
app.get("/calculator1", (req, res) => {
    res.render("calculator1");
});
app.get("/about-us", (req, res) => {
    res.render("about-us");
});
app.get("/contact", (req, res) => {
    res.render("contact");
});
app.get("/alogin", (req, res) => {

    res.render("alogin");
});
app.get("/ll", (req, res) => {
    res.render("ll");
});
app.post("/ll", async (req, res) => {
    console.log('Route /ll is being hit');
    try {
        const { email_id, password } = req.body;
  

        // Check if the email exists in the database
        const user = await Trainer_Register.findOne({ email_id: email_id });
       

console.log("enter in trainer reg page");
        if (user) {
            // Compare the entered password with the hashed password in the database
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (isPasswordMatch) {
                // Passwords match, login successful
                console.log(" trainer Login successful");
                return res.redirect("/trainerdashboard?username=" + email_id);
            } else {
                // Passwords do not match, login failed
                console.log("Incorrect password");
                return res.status(401).send("Incorrect password");
            }
        } else {
            // User with the provided email does not exist
            console.log("hi");
            console.log("User not found");
            return res.status(404).send("User not found");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

app.get("/blog-deatails", (req, res) => {
    res.render("blog-deatails");
});
app.get("/blog", (req, res) => {
    res.render("blog");
});
app.get("/bmi-calculator", (req, res) => {
    res.render("bmi-calculator");
});
app.get("/calculator", (req, res) => {
    res.render("calculator");
});
app.get("/class-details", (req, res) => {
    res.render("class-deatails");
});
app.get("/class-timetable", (req, res) => {
    res.render("class-timetable");
});
app.get("/contact", (req, res) => {
    res.render("contact");
});
app.get("/dashboard", (req, res) => {
    res.render("dashboard");
});
app.get("/feedback", (req, res) => {
    res.render("feedback");
});
app.get("/main", (req, res) => {
    res.render("main");
});
app.get("/plans", (req, res) => {
    res.render("plans");
});
app.get("/register", (req, res) => {
    res.render("register");
});
app.get("/services", (req, res) => {
    res.render("services");
});
app.get("/team", (req, res) => {
    res.render("team");
});
app.get("/trainer", (req, res) => {
    res.render("trainer");
});
app.get("/trainer1", (req, res) => {
    res.render("trainer1");
});

app.get("/trainer_reg", (req, res) => {
    res.render("trainer_reg");
});

app.get("/index2", (req, res) => {
    res.render("index2");
});
//tainer register
app.post("/trainer_reg", async (req, res) => {
    
    try {
  
        const { name,email_id, phone_no,experience,certificates,certificateFile, password, confirmpassword } = req.body;

        if (password === confirmpassword) {
            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new Register document
            const newRegister = new Trainer_Register({
                name:req.body.name,
                email_id: req.body.email_id,
                phone_no: req.body.phone_no,
                experience:req.body.experience,
                certificates:req.body.certificates,
                certificateFile:req.body.certificateFile,
                password: hashedPassword,
                confirmpassword: req.body.password,
            });

            // Save the document to the database
            const registered = await newRegister.save();

            // Check if the registration was successful
            if (registered) {
                console.log("Trainer registration done");
                // Render the index view if registration is successful
               return res.status(201).render("ll");
            } else {
                console.log("Trainer registration failed");
                return res.status(500).send("User registration failed");
            }
        } else {
           return res.status(400).send("Passwords do not match");
        }
    } catch (error) {
        console.error(error);
        
        return res.status(500).send("Internal Server Error");
    }
});

//trainer login

app.get("/dashboard", (req, res) => {
    res.render("dashboard");
});


// Connect to MongoDB and start the server
connectDb().then(() => {
    console.log('Connected to MongoDB');

    app.listen(port, () => {
        console.log('Server is running at port no', port);
    });
});

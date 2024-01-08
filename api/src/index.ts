import express from "express";
import supabase from "./config/supabase";

async function checkSupabaseConnection() {
  try {
    let { data, error, status } = await supabase.from("Firefighters").select("*");
    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      console.log("Connection with Supabase successful.");
    } else {
      console.log("No data returned");
    }
  } catch (error) {
    console.error("Error checking Supabase connection:", error);
  }
}

checkSupabaseConnection();

async function addFirefighter(name: string, func: string, add_func: string[]) {
  const { data, error } = await supabase
    .from("Firefighters")
    .insert([{ name: name, func: func, add_func: add_func }]).select("*")

  console.log("Firefighter added", data);

  if (error) {
    console.error("Error inserting data", error);
  }
}

// Example usage
addFirefighter("John Doe", "Engineer", ["Paramedic", "Driver"]);

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

import express from 'express';
import supabase from './config/supabase';

async function checkSupabaseConnection() {
    try {
        let { data, error, status } = await supabase
            .from('Firefighters') // Replace with your table name
            .select('*')
            .limit(1); // Get only one record

        if (error && status !== 406) {
            throw error;
        }

        if (data) {
            console.log('Connection successful. Data:', data);
        } else {
            console.log('No data returned');
        }
    } catch (error) {
        console.error('Error checking Supabase connection:', error);
    }
}

checkSupabaseConnection();

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});

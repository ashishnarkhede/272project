package Visualization;

import java.io.IOException;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONException;
import com.mysql.jdbc.Connection;
import com.mysql.jdbc.ResultSetMetaData;

@SuppressWarnings("unused")
public class dbconnection {
	
	public boolean flag = false;
	
	private static final String DB_DRIVER = "com.mysql.jdbc.Driver";
	//private static final String DB_CONNECTION = "jdbc:mysql://127.0.0.1:3306/aviationevents";
	//private static final String DB_USER = "root";
	//private static final String DB_PASSWORD = "root";
	
	private static final String DB_CONNECTION = "jdbc:mysql://sql2.freemysqlhosting.net:3306/sql239406";
	private static final String DB_USER = "sql239406";
	private static final String DB_PASSWORD = "nZ7!hH3*";
	
	
	 public String Query = "";
	 public static String str = "";
	 private static ResultSet resultSet = null; 
	
	 private static List<org.json.JSONObject> list;
	 private static org.json.JSONObject jsonobj=null;
	 
     Connection dbConnection = null;;

    // get database connection
	public Connection getDBConnection() {
		try {
			
			Class.forName(DB_DRIVER);
			System.out.println("Driver found....");
			flag = true;
 
		} catch (ClassNotFoundException e) {
			
			flag = false;
			System.out.println("Driver not found....");
			System.out.println(e.getMessage());
 
		}
 
		try {
 
			dbConnection = (Connection) DriverManager.getConnection(DB_CONNECTION, DB_USER,DB_PASSWORD);
			System.out.println("Connected....");

			return dbConnection;
 
		} catch (SQLException e) {
 
			System.out.println("Connection error...");
			System.out.println(e.getMessage());
 
		}
		return dbConnection; 
	}

	// retrieve records from database
	private void selectRecordsFromDbUserTable() throws SQLException {
		 
		Statement statement = null;		
		//String selectTableSQL = "select acft_make as Make, sum(inj_person_count) as Total_Injuries from aircraft as acft, injury as inj where acft.ev_id = inj.ev_id group by acft_make order by 2 DESC";
 
		//String newQuery = "select acft_make as Make, acft_model as Model, sum(inj_person_count) as Injuries from aircraft as acft, injury as inj where acft.ev_id = inj.ev_id group by acft_make,acft_model order by 1, 3 DESC";
		
		try {
			dbConnection = getDBConnection();
			statement = dbConnection.createStatement();
  
			System.out.println(Query);
 
			resultSet = statement.executeQuery(Query);
			
			//resultSet = statement.executeQuery(Query);
			
			convertToJSON(resultSet);
			
		} 
		catch (SQLException e) 
		{			
			System.out.println("Error executing the query....");
			System.out.println(e.getMessage()); 
		} 
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		finally {
 
			if (statement != null) {
				statement.close();
			}
 
			if (dbConnection != null) {
				dbConnection.close();
			}
 
		}//FINALLY
		//return resultSet;
 
	}
	

    private static void convertToJSON(ResultSet resultSet) throws Exception {
    	
    	 boolean flag = false;
		 org.json.JSONObject obj=null;
		 list = new ArrayList<org.json.JSONObject>();
		 
		 ResultSetMetaData mtdt = (ResultSetMetaData) resultSet.getMetaData();
		 int total_rows = mtdt.getColumnCount();
         			 
		 while (resultSet.next()) 
		 {           
            if(obj != null && flag)
            {
            	list.add(obj);
            }
            
            obj = new org.json.JSONObject();
            
     
            for (int i = 0; i < total_rows; i++) 
            {
            	int j = i+1;
            	
            	if(resultSet.getObject(j) == null)
            	{      
            	 flag = false;	
            	 break;
            	}
            	else 
            	{
            		flag = true;	
            		obj.put(mtdt.getColumnLabel(j).toLowerCase(), resultSet.getObject(j));
                }
            }         
        }		 	
		
}
   
	
	public List<org.json.JSONObject> getData()
	{	
		try 
		{
			selectRecordsFromDbUserTable();			
		} 
		catch (SQLException e) 
		{
			e.printStackTrace();
		}
	
		return list;
				
	}
	
    
	public static void main(String[] args) {

	dbconnection obj = new dbconnection();
	//String s= "";
	
     obj.getData();
     
     
    	
	}//main

}//class

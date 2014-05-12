package Visualization;

import java.io.IOException;
import java.util.List;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/FlightPhaseStatistics")
public class FlightPhaseStatistics extends HttpServlet implements Servlet {
	private static final long serialVersionUID = 1L;
    
    dbconnection obj = new dbconnection();
	
    public FlightPhaseStatistics() {
        super();
        
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		obj.Query = "SELECT count( ev_id ) AS event_count, meaning AS flight_phase FROM event_details e JOIN phase_dt p ON ( e.phase_flt_spec = p.code ) WHERE inj_fat >0 AND phase_flt_spec >=500 AND ev_type = 'ACC' GROUP BY 2 ORDER BY 1 DESC limit 15";
    	
		
		response.setContentType("application/json");

		List<org.json.JSONObject> list = obj.getData();
			
	    response.getWriter().write(list.toString());
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
	
	}

}

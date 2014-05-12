package Visualization;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/AccidentCountbyFlightPhase")
public class AccidentCountbyFlightPhase extends HttpServlet {
	private static final long serialVersionUID = 1L;
    dbconnection obj = new dbconnection();
    private static String phase=null;
	  
  
    public AccidentCountbyFlightPhase() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		obj.Query= "SELECT count(ev_id) count, ev_year FROM event_details WHERE inj_fat>0 AND phase_flt_spec="+phase+" AND ev_type = 'ACC' GROUP BY ev_year ORDER BY 2";
		
		response.setContentType("application/json");

		List<org.json.JSONObject> list = obj.getData();
			
	    response.getWriter().write(list.toString());
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
System.out.println("Hit....");
		
		phase = request.getParameter("phase");

		response.getWriter().println("Hi, "+phase+" Ajax Call is made successfully.");
	}

}

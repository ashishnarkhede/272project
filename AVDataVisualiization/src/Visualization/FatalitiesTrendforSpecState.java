package Visualization;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class FatalitiesTrendforSpecState
 */
@WebServlet("/FatalitiesTrendforSpecState")
public class FatalitiesTrendforSpecState extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static String state=null;
	dbconnection dbconobj = new dbconnection();

    public FatalitiesTrendforSpecState() {
        super();
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		  	
    	  dbconobj.Query = "Select ev_year as year, sum(inj_tot) as fatalities from event_details where ev_state='"+state+"' and ev_year>'1980' group by ev_year order by 1";
    	
    	  response.setContentType("application/json");
  		
  		  List<org.json.JSONObject> list = dbconobj.getData();
  		
  		  response.getWriter().write(list.toString());
		
		
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		state = request.getParameter("state");
		state = state.trim();
		response.getWriter().println("Hi, "+state+" Ajax Call is made successfully.");
	
		
	}

}

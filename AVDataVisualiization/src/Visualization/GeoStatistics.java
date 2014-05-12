package Visualization;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/GeoStatistics")
public class GeoStatistics extends HttpServlet {
	private static final long serialVersionUID = 1L;
     
	dbconnection dbobj = new dbconnection();

	
    public GeoStatistics() {
        super();
        
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		dbobj.Query = "select ev_state, name, count(ev_id) as count from event_details e, states s where e.ev_state = s.state group by ev_state order by 2 DESC";
	    response.setContentType("application/json");
		
		List<org.json.JSONObject> list = dbobj.getData();
		
		response.getWriter().write(list.toString());
		
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

}

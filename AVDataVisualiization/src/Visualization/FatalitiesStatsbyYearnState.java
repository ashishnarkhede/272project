package Visualization;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/FatalitiesStatsbyYearnState")
public class FatalitiesStatsbyYearnState extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	dbconnection dbconobj = new dbconnection();

	
    public FatalitiesStatsbyYearnState() {
        super();

    }

 
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		dbconobj.Query = "select ev_state, name, sum(inj_fat)as fatalities from event_details join states on(ev_state = state) where ev_state is not null group by ev_state";
		
		response.setContentType("application/json");
		
		List<org.json.JSONObject> list = dbconobj.getData();
		
		response.getWriter().write(list.toString());
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
	
	}

}

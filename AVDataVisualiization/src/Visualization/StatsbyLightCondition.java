package Visualization;


import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/StatsbyLightCondition")
public class StatsbyLightCondition extends HttpServlet {
	private static final long serialVersionUID = 1L;

	dbconnection dbobj = new dbconnection();

    public StatsbyLightCondition() {
        super();
        
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
	dbobj.Query = "select light_cond, ev_year, sum(inj_tot) as fatalities, damage from event_details group by light_cond, ev_year, damage";

	response.setContentType("application/json");
	
	List<org.json.JSONObject> list = dbobj.getData();
	
	response.getWriter().write(list.toString());
	
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}

}

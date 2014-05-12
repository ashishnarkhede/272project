package Visualization;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/FatalitiesbyMakenModel")
public class FatalitiesbyMakenModel extends HttpServlet {
	private static final long serialVersionUID = 1L;

   
    public FatalitiesbyMakenModel() {
        
    	
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
        dbconnection obj = new dbconnection();
 		
	//	obj.Query = "select acft_make as Make, sum(inj_person_count) as Total_Injuries from aircraft as acft, injury as inj where acft.ev_id = inj.ev_id group by acft_make order by 2 DESC";
		
        obj.Query = "select acft_make as Make, sum(inj_tot) as Total_Fatalities from event_details group by acft_make order by 2 DESC limit 50";
		
        
        response.setContentType("application/json");

		List<org.json.JSONObject> list = obj.getData();
		
		response.getWriter().write(list.toString());
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

}

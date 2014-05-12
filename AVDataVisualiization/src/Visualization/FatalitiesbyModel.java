package Visualization;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/FatalitiesbyModel")
public class FatalitiesbyModel extends HttpServlet {
	private static final long serialVersionUID = 1L;
	dbconnection dbconobj = new dbconnection();
	private static String make="";
   
    public FatalitiesbyModel() {
        super();
        
    }

    private String formQuery()
    {
        //String query = "select acft_model as model, sum(inj_person_count) as injuries from aircraft as acft, injury as inj where acft.ev_id = inj.ev_id and acft_make='"+model+"' group by acft_model order by 2 DESC limit 10";   
        
    	String query = "Select acft_model as model, sum(inj_fat) as fatalities from event_details where acft_make='"+make+"' group by acft_model order by 2 desc limit 10";
    	return query;
    }
    
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 dbconobj.Query = formQuery();
			
			//dbconobj.Query = "select acft_model as model, sum(inj_person_count) as injuries from aircraft as acft, injury as inj where acft.ev_id = inj.ev_id and acft_make='Boeing' group by acft_model order by 2 DESC limit 10";

			response.setContentType("application/json");
			
			List<org.json.JSONObject> list = dbconobj.getData();
			
			response.getWriter().write(list.toString());
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String acftmodel=request.getParameter("make");
		make = acftmodel.trim();
		response.getWriter().println("Hi, "+make+" Ajax Call is made successfully.");

	}

}

<?php 

class Search_model extends CI_model {

	function getSearch()
	{

		$data = json_decode(file_get_contents("php://input"),true);
		
				
		$query = $this->db->query('SELECT * FROM TagEntry WHERE normalizedTag LIKE "%'.$data['term'].'%" AND matchingTagEntry_id IS NOT NULL GROUP BY normalizedTag LIMIT 5');
		$searchresults = array();
		foreach ($query->result() as $row) {
	        $searchresults[] = array(
	        	'naam' => $row->normalizedTag,
	        	);
	    }
	   
	    return $searchresults; 
	}
}

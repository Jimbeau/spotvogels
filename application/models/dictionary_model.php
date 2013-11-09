<?php 

class Dictionary_model extends CI_model {

	function getDictionary()
	{
	
		$query = $this->db->query('SELECT name, id as dictionary_id FROM Dictionary WHERE Id > 10');
		$dictionary = array();
		foreach ($query->result() as $row) {
	        $dictionary[] = array(
	        	'name' => $row->name,
	        	'id' => $row->dictionary_id,
	        	);
	    }
	   
	    return $dictionary; 
	}
	
	function getPrid()
	{
	
		$data = json_decode(file_get_contents("php://input"),true);	
	
		$query = $this->db->query('SELECT DISTINCT t.normalizedTag, v.prid, v.title, v.imageUrl, t.gametime	 
							       FROM DictionaryEntry as d, TagEntry as t, Video as v 
							       WHERE d.dictionary_id =' . $data['term'] .' 
							       AND d.normalizedTag = t.normalizedTag 
							       AND v.id = t.game_id 
							       AND v.prid IS NOT NULL 
							       LIMIT 30');
		$prid = array();
		foreach ($query->result() as $row) {
	        $prid[] = array(
	        	'normalizedTag' => $row->normalizedTag,
	        	'prid' => $row->prid,
	        	'image' => $row->imageUrl,
	        	'titel' => $row->title,
				'starttijd' => $row->gametime,
	        	);
	    }
	   
	    return $prid; 
	}
	
}
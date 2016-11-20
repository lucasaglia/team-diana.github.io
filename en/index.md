# ![team-diana-logo](../uploads/team-diana-logo-150x150.png) Team Diana Wiki 


## About this wiki 

This is the wiki of the [Team Diana](http://teamdiana.org/) student team. Here you can find tutorials, guides and tips about the software that we use. 
For information about the team and news check out the [official team website](http://teamdiana.org/).  

---

### Latest Changes

<div id="latest-changes"> 

</div>

---

![pcl](http://pointclouds.org/assets/images/contents/logos/pcl/pcl_vert_large_pos.png)
![osrf](http://www.willowgarage.com/sites/default/files/blog/201204/OSR-Logo-Proto4-Vert.png)
![ros](http://www.ros.org/wp-content/uploads/2013/10/rosorg-logo1.png)
![opencv](http://1.bp.blogspot.com/-yvrV6MUueGg/ToICp0YIDPI/AAAAAAAAADg/YKNtJPfx-H8/s1600/OpenCV_Logo.png)


<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.js"></script>


<script src="./show_changes.js"></script>

<script type="template" id="progress_bar">
<div class="progress">
  <div id="load_progress_bar" class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
  </div>
</div>
</script>


<script type="template" id="simple">
  <h4> Last update: {{last_update_time}}</h4> 
  
	{{#changes}}
	<div class="panel panel-default">
    <div class="panel-heading"> <a href='{{url}}'> {{author}} (see commit on github) </a></div>
	 <ul class="list-group">
		  {{#files}}
				<li class="list-group-item">
						<span class="label label-success">{{additions}}</span>
						<span class="label label-warning">{{changes}}</span>
						<span class="label label-danger">{{deletions}}</span>
						<a href={{patch_url}}  aria-label="Left Align"> {{filename}}</a>
				</li>
		  {{/files}}
		</ul>

	</div>
	{{/changes}}
</script>

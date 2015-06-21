<h3>Hello</h3>

<p>API calls:</p>
<table>
	<tr>
		<th>Request</th>
		<th>Path</th>
		<th>Parameters</th>
	</tr>
	<tr>
		<td><small>POST</small></td>
		<td>/posts</td>
		<td>longitude, latitude, page</td>
	</tr>
	<tr>
		<td><small>POST</small></td>
		<td>/posts/within</td>
		<td>points - the array of 4 coordinates (edges of the map)</td>
	</tr>
	<tr>
		<td><small>POST</small></td>
		<td>/posts/new</td>
		<td>longitude, latitude, message, device_id</td>
	</tr>
</table>

<p><small>*add ?sampleflag to query, and api will return only sample posts, instead of real.</small></p>
$.getJSON("students.json", function(data) {
    jQuery(data).each(function(i, item) {
        students.push(item);
    });
    return fillTable();
});

$('#addButton').click(function() {

    let tempStudent = {
        name: $('#name').val(),
        surname: $('#surname').val(),
        age: $('#age').val(),
        avg: $('#avg').val()
    };
    students.push(tempStudent);
    $('#stud').append(
        `<tr>
            	<td>${students[students.length - 1]["name"]}</td>
				 <td>${students[students.length - 1]["surname"]}</td>
				 <td>${students[students.length - 1]["age"]}</td>
				 <td class= 'avgmark'>${students[students.length - 1]["avg"]}</td>
				 <td><button class="delbut">Дэлит Студент</button></td>
                 <td><button class="editbut">Редактировать</button></td>
		 </tr>`);

});

$('#sumButton').click(function() {

    let sum = 0;
    $('.avgmark').each(function(i) {

        sum += +($(this).text());
    });
    alert("Sum is: " + sum);
});

$(document).on('click', '.delbut', function() {
    var rowNumber = $(this).closest('tr').index();
    students.splice(rowNumber - 1, 1);

    $(this).closest('tr').remove();
    return false;
});

$(document).on('click', '.editbut', function() {
    var newAvgMark = prompt('Enter new mark');
    if (newAvgMark === null) {
        return;
    };
    newAvgMark = +newAvgMark;
    var rowNumber = $(this).closest('tr').index();
    students[rowNumber - 1]['avg'] = newAvgMark;
    $(this).closest('tr').find('.avgmark').text(newAvgMark);
});



function createTable(tid, c1, c2, c3, c4) {
    $("body").append(
        `<table>
	        	<tbody id='${tid}'>
			    <tr>
			    <th>${c1}</th> 
			    <th>${c2}</th>
			    <th>${c3}</th>
			    <th>${c4}</th>
			    </tr>
			    </tbody>
	    </table>`
    );
}

function fillTable() {
    $.each(students, function(i) {
        $("#stud").append(
            `<tr>
		        	<td>${students[i]["name"]}</td>
		        	<td>${students[i]["surname"]}</td>
			        <td>${students[i]["age"]}</td>
			        <td class= 'avgmark'>${students[i]["avg"]}</td>
			        <td><button class="delbut" >Дэлит Студент</button></td>
                    <td><button class="editbut">Редактировать</button></td>
	        </tr>`
        )
    });

}

let students = [];
createTable("stud", "Name", "Surname", "Age", "Average mark");

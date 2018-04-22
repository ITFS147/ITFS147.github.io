//config to connect to firebase
var config = {
    apiKey: "AIzaSyDHN6epAFTpGwywxeqKpc1vzNERGLYfguE",
    authDomain: "math-web-kmitl.firebaseapp.com",
    databaseURL: "https://math-web-kmitl.firebaseio.com",
    projectId: "math-web-kmitl",
    storageBucket: "math-web-kmitl.appspot.com",
};
firebase.initializeApp(config);
//prepare to get image from firebase storage
var stRef = firebase.storage().ref().child('user_pic');
//prepare to get teacher from firebase database
var tdRef = firebase.database().ref('teacher');
//load data once per refresh not realtime
var email_c = 0;
var phone_c = 0;
var education_c = 0;
var research_c = 0;
var spacial_c = 0;
var response_c = 0;
tdRef.once('value', function (snapshot) {
    count = 0;
    //for in every child of data
    snapshot.forEach(function (childSnapshot) {
        count += 1;
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        if (childData.uid == localStorage.getItem('uid')) {
            localStorage.setItem('id', pad(count));
            localStorage.setItem('pid', count);
            var fileName = 'user' + pad(count) + '.jpg';
            var imagesRef = 'user_pic%2F' + fileName;
            $('#avatar_p').attr('src', 'https://firebasestorage.googleapis.com/v0/b/math-web-kmitl.appspot.com/o/' + imagesRef + '?alt=media')
            $('#name-show').append(childData.name_en + ' ' + childData.surname_en + '<BR>' + childData.name + ' ' + childData.surname);
            document.getElementById('en_title').value = childData.title_en;
            document.getElementById('th_title').value = childData.title;
            document.getElementById('en_fname').value = childData.name_en;
            document.getElementById('en_lname').value = childData.surname_en;
            document.getElementById('th_fname').value = childData.name;
            document.getElementById('th_lname').value = childData.surname;
            email_lst = childData.email;
            for (i = 0; i < email_lst.length; i++) {
                $('#all-email').append(appendEmail(email_lst[i], i))
                email_c = i;
            }
            phone_lst = childData.tel;
            for (i = 0; i < phone_lst.length; i++) {
                $('#all-phone').append(appendPhone(phone_lst[i], i))
                phone_c = i;
            }
            document.getElementById('rest_room').value = childData.room;
            document.getElementById('homepage').value = childData.homepage;
            education_lst = childData.education;
            for (i = 0; i < education_lst.length; i++) {
                $('#all-education').append(appendEducation(education_lst[i], i))
                education_c = i;
            }
            spacial_lst = childData.specialized_interests;
            for (i = 0; i < spacial_lst.length; i++) {
                $('#all-spacial').append(appendSpacial(spacial_lst[i], i))
                spacial_c = i;
            }
            research_lst = childData.research;
            for (i = 0; i < research_lst.length; i++) {
                $('#all-research').append(appendResearch(research_lst[i], i))
                research_c = i;
            }

            response_lst = childData.responsible_course;
            for (i = 0; i < response_lst.length; i++) {
                $('#all-response').append(appendResponse(response_lst[i], i))
                response_c = i;
            }
            
        }
        //     document.querySelector('#teacher-list')
        // .innerHTML += teacherCard(childData, count);
    });
    //retreive data for president
});

function reAuthen(){
    var email = localStorage.getItem('email');
    var password = localStorage.getItem('pass');
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (resp) {
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Your password has change. Please Login again.');
        window.location.href = 'login.html';
      } else {
        alert('errorMessage');
      }
    });
}

function signOut() {
    firebase.auth().signOut().then(function () {
        localStorage.clear();
        alert('Signed Out!! Complete');
        window.location.href = 'index.html';
    }).catch(function (error) {
        console.log(error);
    });
}

function resetPassword() {
    var email = localStorage.getItem('email');
    firebase.auth().sendPasswordResetEmail(email).then(
        function () {
            alert('Password Reset Email Sent to your Inbox!');
        }).catch(
            function (error) {
                console.log(error);
            }
        )
}

function appendEmail(email, id) {
    html = "";
    if (id == 0) {
        html += '<div id="email0">'
        html += '<input type="email" class="form-control border-input sub_em" placeholder="Email" value="' + email + '">'
        html += '</div>'
        return html
    } else {
        html += '<div id="email' + id + '">'
        html += '<input type="email" class="form-control border-input sub_em" placeholder="Email" value="' + email + '">'
        html += '<a href="#" onclick="removeEmail(&quot;email' + id + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
        html += '</div>'
        return html
    }

}

function appendPhone(phone, id) {
    html = "";
    if (id == 0) {
        html += '<div id="phone0">'
        html += '<input type="text" class="form-control border-input sub_ph" placeholder="Phone" value="' + phone + '">'
        html += '</div>'
        return html
    } else {
        html += '<div id="phone' + id + '">'
        html += '<input type="text" class="form-control border-input sub_ph" placeholder="Phone" value="' + phone + '">'
        html += '<a href="#" onclick="removePhone(&quot;phone' + id + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
        html += '</div>'
        return html
    }

}

function appendEducation(education, id) {
    html = "";
    if (id == 0) {
        html += '<div id="education0">'
        html += '<input type="text" class="form-control border-input sub_ed" placeholder="Education" value="' + education + '">'
        html += '</div>'
        return html
    } else {
        html += '<div id="education' + id + '">'
        html += '<input type="text" class="form-control border-input sub_ed" placeholder="Education" value="' + education + '">'
        html += '<a href="#" onclick="removeEducation(&quot;education' + id + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
        html += '</div>'
        return html
    }

}

function appendSpacial(spacial, id) {
    html = "";
    if (id == 0) {
        html += '<div id="spacial0">'
        html += '<input type="text" class="form-control border-input sub_sp" placeholder="Interest" value="' + spacial + '">'
        html += '</div>'
        return html
    } else {
        html += '<div id="spacial' + id + '">'
        html += '<input type="text" class="form-control border-input sub_sp" placeholder="Interest" value="' + spacial + '">'
        html += '<a href="#" onclick="removeSpacial(&quot;spacial' + id + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
        html += '</div>'
        return html
    }

}

function appendResearch(research, id) {
    html = "";
    if (id == 0) {
        html += '<div id="research0">'
        html += '<textarea rows="2" class="form-control border-input sub_rs" placeholder="Here can be your description" value="Research">' + research + '</textarea>'
        html += '</div>'
        return html
    } else {
        html += '<div id="research' + id + '">'
        html += '<textarea rows="2" class="form-control border-input sub_rs" placeholder="Here can be your description" value="Research">' + research + '</textarea>'
        html += '<a href="#" onclick="removeResearch(&quot;research' + id + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
        html += '</div>'
        return html
    }

}

function appendResponse(response, id) {
    html = "";
    if (id == 0) {
        html += '<div id="response0">'
        html += '<input type="text" class="form-control border-input sub_rp" placeholder="รายวิชาที่รับผิดชอบ" value="' + response + '">'
        html += '</div>'
        return html
    } else {
        html += '<div id="response' + id + '">'
        html += '<input type="text" class="form-control border-input sub_rp" placeholder="Interest" value="' + response + '">'
        html += '<a href="#" onclick="removeResponse(&quot;response' + id + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
        html += '</div>'
        return html
    }

}

function createEmail() {
    email_c += 1;
    html = "";
    html += '<div id="email' + email_c + '">'
    html += '<input type="email" class="form-control border-input sub_em" placeholder="Email">'
    html += '<a href="#" onclick="removeEmail(&quot;email' + email_c + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
    html += '</div>'
    $('#all-email').append(html);
}

function createPhone() {
    phone_c += 1;
    html = "";
    html += '<div id="phone' + phone_c + '">'
    html += '<input type="text" class="form-control border-input sub_ph" placeholder="Phone">'
    html += '<a href="#" onclick="removePhone(&quot;phone' + phone_c + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
    html += '</div>'
    $('#all-phone').append(html);
}

function createEducation() {
    education_c += 1;
    html = "";
    html += '<div id="education' + education_c + '">'
    html += '<input type="text" class="form-control border-input sub_ed" placeholder="Education">'
    html += '<a href="#" onclick="removeEducation(&quot;education' + education_c + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
    html += '</div>'
    $('#all-education').append(html);
}

function createSpacial() {
    spacial_c += 1;
    html = "";
    html += '<div id="spacial' + spacial_c + '">'
    html += '<input type="text" class="form-control border-input sub_sp" placeholder="Interest">'
    html += '<a href="#" onclick="removeSpacial(&quot;spacial' + spacial_c + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
    html += '</div>'
    $('#all-spacial').append(html);
}

function createResearch() {
    research_c += 1;
    html = "";
    html += '<div id="spacial' + research_c + '">'
    html += '<textarea rows="2" class="form-control border-input sub_rs" placeholder="Here can be your description" value="Research"></textarea>'
    html += '<a href="#" onclick="removeResearch(&quot;research' + research_c + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
    html += '</div>'
    $('#all-research').append(html);
}

function createResponse() {
    response_c += 1;
    html = "";
    html += '<div id="response' + response_c + '">'
    html += '<input type="text" class="form-control border-input sub_rp" placeholder="รายวิชาที่รับผิดชอบ">'
    html += '<a href="#" onclick="removeResponse(&quot;response' + response_c + '&quot;)"><img src="images/icons/delete.png">ลบข้อมูล</a>'
    html += '</div>'
    $('#all-response').append(html);
}

function removeEmail(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
    email_c -= 1;
}

function removePhone(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
    phone_c -= 1;
}

function removeEducation(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
    phone_c -= 1;
}

function removeSpacial(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
    spacial_c -= 1;
}

function removeResearch(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
    research_c -= 1;
}

function removeResponse(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
    response_c -= 1;
}

function saveData(){
    var teacher = tdRef.child('user'+localStorage.getItem('id'));
    teacher.update(JSON.parse(createJSON())).then(function (resp){
        // alert('success');
    }).catch(function (error){
        // alert('failed');
        // console.log(error);
    });
    var file = $('#profile_pic').get(0).files[0];
    var file_exten = file.name.replace(/^.*\./, '');
    console.log(file_exten);
      if(file && file_exten == 'jpg') {
        var task = stRef.child('user'+localStorage.getItem('id')+'.'+file_exten).put(file);
        task.then(function(snapshot){
            alert('success');
          })
          .catch(function(error){
            alert('error');
          });
        }else{
            alert('กรุณาอัพโหลดไฟล์นามสกุล .jpg');
        }
    }

function createJSON(){
    var ed = new Array();
    var em = new Array();
    var ph = new Array();
    var sp = new Array();
    var rs = new Array();
    var rp = new Array();
    for(i=0;i<$('.sub_ed').length;i++){
        ed.push('"'+$('.sub_ed')[i].value+'"');
    }
    for(i=0;i<$('.sub_em').length;i++){
        em.push('"'+$('.sub_em')[i].value+'"');
    }
    for(i=0;i<$('.sub_ph').length;i++){
        ph.push('"'+$('.sub_ph')[i].value+'"');
    }
    for(i=0;i<$('.sub_sp').length;i++){
        sp.push('"'+$('.sub_sp')[i].value+'"');
    }
    for(i=0;i<$('.sub_rs').length;i++){
        rs.push('"'+$('.sub_rs')[i].value+'"');
    }
    for(i=0;i<$('.sub_rp').length;i++){
        rp.push('"'+$('.sub_rp')[i].value+'"');
    }
    var json_str = "";
    json_str += '{';
    json_str += '"education" : ['+ed.toString()+'],';
    json_str += '"email" : ['+em.toString()+'],';
    json_str += '"tel" : ['+ph.toString()+'],';
    json_str += '"specialized_interests" : ['+sp.toString()+'],';
    json_str += '"research " : ['+rs.toString()+'],';
    json_str += '"responsible_course" : ['+rp.toString()+'],';
    json_str += '"name" : "'+document.getElementById('th_fname').value+'",';
    json_str += '"surname" : "'+document.getElementById('th_lname').value+'",';
    json_str += '"name_en" : "'+document.getElementById('en_fname').value+'",';
    json_str += '"surname_en" : "'+document.getElementById('en_lname').value+'",';
    json_str += '"title" : "'+document.getElementById('th_title').value+'",';
    json_str += '"title_en" : "'+document.getElementById('en_title').value+'",';
    json_str += '"room" : "'+document.getElementById('rest_room').value+'",';
    json_str += '"homepage" : "'+document.getElementById('homepage').value+'"';
    json_str += '}';
    console.log(json_str);
    return json_str;
}
//pad number one length with zero
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }
(this["webpackJsonpthe-makers-corner"]=this["webpackJsonpthe-makers-corner"]||[]).push([[0],{107:function(e,t,n){"use strict";n.r(t);var c=n(3),r=n(2),a=n.n(r),s=n(47),i=n.n(s),o=n(109),l=n(87),u=n(15),j=n(13),d=n(31),b=n.n(d),O=n(33),h=n(36),p=n(32),m=n(8),x=n(28),g="UPDATE_PRODUCTS",f="UPDATE_CATEGORIES",v="UPDATE_CURRENT_CATEGORY",y="ADD_TO_CART",_="ADD_MULTIPLE_TO_CART",k="REMOVE_FROM_CART",w="CLEAR_CART",N="UPDATE_CART_QUANTITY",C="TOGGLE_CART";function T(e,t,n){return new Promise((function(c,r){var a,s,i,o=window.indexedDB.open("The-Makers-Corner",1);o.onupgradeneeded=function(e){var t=o.result;t.createObjectStore("products",{keyPath:"_id"}),t.createObjectStore("categories",{keyPath:"_id"}),t.createObjectStore("cart",{keyPath:"_id"})},o.onerror=function(e){console.log("There was an error")},o.onsuccess=function(r){switch(a=o.result,s=a.transaction(e,"readwrite"),i=s.objectStore(e),a.onerror=function(e){console.log("error",e)},t){case"put":i.put(n),c(n);break;case"get":var l=i.getAll();l.onsuccess=function(){c(l.result)};break;case"delete":i.delete(n._id);break;default:console.log("No valid method")}s.oncomplete=function(){a.close()}}}))}var S=function(e){var t=e.item,n=Object(x.b)();return Object(c.jsxs)("div",{className:"flex-row",children:[Object(c.jsx)("div",{children:Object(c.jsx)("img",{src:"/images/".concat(t.image),alt:""})}),Object(c.jsxs)("div",{children:[Object(c.jsxs)("div",{children:[t.name,", $",t.price]}),Object(c.jsxs)("div",{children:[Object(c.jsx)("span",{children:"Qty:"}),Object(c.jsx)("input",{type:"number",placeholder:"1",value:t.purchaseQuantity,onChange:function(e){var c=e.target.value;"0"===c?(n({type:k,_id:t._id}),T("cart","delete",Object(m.a)({},t))):(n({type:N,_id:t._id,purchaseQuantity:parseInt(c)}),T("cart","put",Object(m.a)(Object(m.a)({},t),{},{purchaseQuantity:parseInt(c)})))}}),Object(c.jsx)("span",{role:"img","aria-label":"trash",onClick:function(){return function(e){n({type:k,_id:e._id}),T("cart","delete",Object(m.a)({},e))}(t)},children:"\ud83d\uddd1\ufe0f"})]})]})]})},$=n(82),D=n(83),E=n(62),A=new(function(){function e(){Object($.a)(this,e)}return Object(D.a)(e,[{key:"getProfile",value:function(){return Object(E.a)(this.getToken())}},{key:"loggedIn",value:function(){var e=this.getToken();return!!e&&!this.isTokenExpired(e)}},{key:"isTokenExpired",value:function(e){try{return Object(E.a)(e).exp<Date.now()/1e3}catch(t){return!1}}},{key:"getToken",value:function(){return localStorage.getItem("id_token")}},{key:"login",value:function(e){localStorage.setItem("id_token",e),window.location.assign("/")}},{key:"logout",value:function(){localStorage.removeItem("id_token"),window.location.assign("/")}}]),e}()),I=n(84),P=n(18),F=n(12),R=n.n(F);function q(){var e=Object(P.a)(["\n  {\n    blueprints {\n      _id\n      name\n      description\n      price\n      quantity\n      category {\n        name\n      }\n    }\n  }\n"]);return q=function(){return e},e}function L(){var e=Object(P.a)(["\n  query getBlueprints($category: ID) {\n    blueprints(category: $category) {\n      _id\n      name\n      description\n      price\n      quantity\n      image\n      category {\n        _id\n      }\n    }\n  }\n"]);return L=function(){return e},e}function Q(){var e=Object(P.a)(["\n  {\n    me {\n      _id\n      username\n      email\n      comments {\n        _id\n        commentText\n        createdAt\n      }\n    }\n  }\n"]);return Q=function(){return e},e}function U(){var e=Object(P.a)(["\n  query comments($username: String) {\n    comments(username: $username) {\n      _id\n      commentText\n      createdAt\n      username\n    }\n  }\n"]);return U=function(){return e},e}function M(){var e=Object(P.a)(["\n  query getCheckout($products: [ID]!) {\n    checkout(products: $products) {\n      session\n    }\n  }\n"]);return M=function(){return e},e}function B(){var e=Object(P.a)(["\n{\n  user {\n    firstName\n    lastName\n    orders {\n      _id\n      purchaseDate\n      blueprints {\n        _id\n        name\n        description\n        price\n        quantity\n        image\n      }\n      courses {\n        _id\n        name\n        description\n        price\n        quantity\n        image\n      }\n    }\n  }\n}\n"]);return B=function(){return e},e}function J(){var e=Object(P.a)(["\n{\n  categories {\n    _id\n    name\n  }\n}\n"]);return J=function(){return e},e}function G(){var e=Object(P.a)(["\n  {\n    courses {\n      _id\n      name\n      description\n      price\n      quantity\n      category {\n        name\n      }\n    }\n  }\n"]);return G=function(){return e},e}function Y(){var e=Object(P.a)(["\n  query getCourse($category: ID) {\n    courses(category: $category) {\n      _id\n      name\n      description\n      price\n      quantity\n      image\n      category {\n        _id\n      }\n    }\n  }\n"]);return Y=function(){return e},e}R()(Y()),R()(G());var H=R()(J()),z=(R()(B()),R()(M())),K=(R()(U()),R()(Q()),R()(L()),R()(q()),n(53)),V={products:[],cart:[],cartOpen:!1,categories:[],currentCategory:""},W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case g:return console.log(t.type),Object(m.a)(Object(m.a)({},e),{},{products:Object(O.a)(t.products)});case f:return console.log(t.type),Object(m.a)(Object(m.a)({},e),{},{categories:Object(O.a)(t.categories)});case v:return console.log(t.type),Object(m.a)(Object(m.a)({},e),{},{currentCategory:t.currentCategory});case y:return console.log(t.type),Object(m.a)(Object(m.a)({},e),{},{cartOpen:!0,cart:[].concat(Object(O.a)(e.cart),[t.product])});case _:return console.log(t.type),Object(m.a)(Object(m.a)({},e),{},{cart:[].concat(Object(O.a)(e.cart),Object(O.a)(t.products))});case k:console.log(t.type);var n=e.cart.filter((function(e){return e._id!==t._id}));return Object(m.a)(Object(m.a)({},e),{},{cartOpen:n.length>0,cart:n});case N:return console.log(t.type),Object(m.a)(Object(m.a)({},e),{},{cartOpen:!0,cart:e.cart.map((function(e){return t._id===e._id&&(e.purchaseQuantity=t.purchaseQuantity),e}))});case w:return console.log(t.type),Object(m.a)(Object(m.a)({},e),{},{cartOpen:!1,cart:[]});case C:return console.log(t.type),Object(m.a)(Object(m.a)({},e),{},{cartOpen:!e.cartOpen});default:return e}},X=Object(K.b)(W),Z=(n(99),Object(I.a)("pk_test_TYooMQauvdEDq54NiTphI7jx")),ee=function(){var e=Object(x.b)(),t=X.getState();Object(x.c)((function(e){return e}));var n=Object(o.useLazyQuery)(z),a=Object(p.a)(n,2),s=a[0],i=a[1].data;function l(){e({type:C})}if(Object(r.useEffect)((function(){function n(){return(n=Object(h.a)(b.a.mark((function t(){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,T("cart","get");case 2:n=t.sent,e({type:_,products:Object(O.a)(n)});case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}t.cart.length||function(){n.apply(this,arguments)}()}),[t.cart.length,e]),Object(r.useEffect)((function(){i&&Z.then((function(e){e.redirectToCheckout({sessionId:i.checkout.session})}))}),[i,e]),!t.cartOpen)return Object(c.jsx)("div",{className:"cart-closed",onClick:l,children:Object(c.jsx)("span",{role:"img","aria-label":"trash",children:"\ud83d\uded2"})});return Object(c.jsxs)("div",{className:"cart",children:[Object(c.jsx)("div",{className:"close",onClick:l,children:"[close]"}),Object(c.jsx)("h2",{children:"Shopping Cart"}),t.cart.length?Object(c.jsxs)("div",{children:[t.cart.map((function(e){return Object(c.jsx)(S,{item:e},e._id)})),Object(c.jsxs)("div",{className:"flex-row space-between",children:[Object(c.jsxs)("strong",{children:["Total: $",function(){var e=0;return t.cart.forEach((function(t){e+=t.price*t.purchaseQuantity})),e.toFixed(2)}()]}),A.loggedIn()?Object(c.jsx)("button",{onClick:function(){var e=[];t.cart.forEach((function(t){for(var n=0;n<t.purchaseQuantity;n++)e.push(t._id)})),s({variables:{products:e}})},children:"Checkout"}):Object(c.jsx)("span",{children:"(log in to check out)"})]})]}):Object(c.jsxs)("h3",{children:[Object(c.jsx)("span",{role:"img","aria-label":"shocked",children:"\ud83d\ude31"}),"You haven't added anything to your cart yet!"]})]})},te=function(){return Object(c.jsx)("div",{className:"container",children:Object(c.jsx)("h2",{children:"Home"})})},ne=function(){return Object(c.jsx)("div",{children:Object(c.jsx)("h2",{children:"404 Page Not Found"})})};var ce=function(){var e=Object(x.b)(),t=Object(x.c)((function(e){return e})).categories,n=Object(o.useQuery)(H),a=n.loading,s=n.data;return Object(r.useEffect)((function(){s?(e({type:f,categories:s.categories}),s.categories.forEach((function(e){T("categories","put",e)}))):a||T("categories","get").then((function(t){e({type:f,categories:t})}))}),[s,a,e]),Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Choose a Category:"}),t.map((function(t){return Object(c.jsx)("button",{onClick:function(){var n;n=t._id,e({type:v,currentCategory:n})},children:t.name},t._id)}))]})},re=function(){return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Blueprints Page"}),Object(c.jsx)(ce,{}),Object(c.jsx)(ee,{})]})},ae=function(){return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Classes Page"}),Object(c.jsx)(ce,{}),Object(c.jsx)(ee,{})]})},se=function(){return Object(c.jsx)("div",{children:Object(c.jsx)("h2",{children:"Dashboard"})})},ie=n(37);function oe(){var e=Object(P.a)(["\n    mutation addComment($commentText: String!) {\n        addComment(commentText: $commentText) {\n            _id\n            commentText\n            createdAt\n            username\n        }\n    }\n"]);return oe=function(){return e},e}function le(){var e=Object(P.a)(["\n    mutation addOrder($classes:[ID]!, $blueprints: [ID]!) {\n        addOrder(classes: $classes, blueprints: $blueprints) {\n            purchaseDate\n            classes {\n                _id\n                name\n                description\n                price\n                category {\n                    name\n                }\n            }\n            blueprints {\n                _id\n                name\n                description\n                price\n                category {\n                    name\n                }\n            }\n        }\n    }\n"]);return le=function(){return e},e}function ue(){var e=Object(P.a)(["\n    mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {\n        addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {\n            token\n            user {\n                _id\n            }\n        }\n    }\n"]);return ue=function(){return e},e}function je(){var e=Object(P.a)(["\n    mutation login($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n            token\n            user {\n                _id\n            }\n        }\n    }\n"]);return je=function(){return e},e}var de=R()(je()),be=R()(ue()),Oe=(R()(le()),R()(oe()),function(e){var t=Object(r.useState)({email:"",password:""}),n=Object(p.a)(t,2),a=n[0],s=n[1],i=Object(o.useMutation)(de),l=Object(p.a)(i,2),j=l[0],d=l[1].error,O=function(){var e=Object(h.a)(b.a.mark((function e(t){var n,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,j({variables:{email:a.email,password:a.password}});case 4:n=e.sent,c=n.data.login.token,A.login(c),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}(),x=function(e){var t=e.target,n=t.name,c=t.value;s(Object(m.a)(Object(m.a)({},a),{},Object(ie.a)({},n,c)))};return Object(c.jsxs)("div",{children:[Object(c.jsx)(u.b,{to:"/signup",children:"Signup instead"}),Object(c.jsx)("h2",{children:"Login"}),Object(c.jsxs)("form",{onSubmit:O,children:[Object(c.jsxs)("div",{children:[Object(c.jsx)("label",{htmlFor:"email",children:"Email address: "}),Object(c.jsx)("input",{placeholder:"johndoe@test.com",name:"email",type:"email",id:"email",onChange:x})]}),Object(c.jsxs)("div",{children:[Object(c.jsx)("label",{htmlFor:"password",children:"Password: "}),Object(c.jsx)("input",{placeholder:"******",name:"password",type:"password",id:"password",onChange:x})]}),d?Object(c.jsx)("div",{children:Object(c.jsx)("p",{children:" Oops. Looks like the credentials provided are incorrect. Please try again!"})}):null,Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"Submit"})})]})]})}),he=function(){return Object(c.jsx)("div",{children:Object(c.jsx)("h2",{children:"Message Board"})})},pe=function(e){var t=Object(r.useState)({email:"",password:""}),n=Object(p.a)(t,2),a=n[0],s=n[1],i=Object(o.useMutation)(be),l=Object(p.a)(i,2),j=l[0],d=l[1].error,O=function(){var e=Object(h.a)(b.a.mark((function e(t){var n,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,j({variables:{email:a.email,password:a.password,firstName:a.firstName,lastName:a.lastName}});case 3:n=e.sent,c=n.data.addUser.token,A.login(c);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x=function(e){var t=e.target,n=t.name,c=t.value;s(Object(m.a)(Object(m.a)({},a),{},Object(ie.a)({},n,c)))};return Object(c.jsxs)("div",{children:[Object(c.jsx)(u.b,{to:"/login",children:"Login instead"}),Object(c.jsx)("h2",{children:"Signup"}),Object(c.jsxs)("form",{onSubmit:O,children:[Object(c.jsxs)("div",{children:[Object(c.jsx)("label",{htmlFor:"firstName",children:"First Name: "}),Object(c.jsx)("input",{placeholder:"John",name:"firstName",type:"firstName",id:"firstName",onChange:x})]}),Object(c.jsxs)("div",{children:[Object(c.jsx)("label",{htmlFor:"lastName",children:"Last Name: "}),Object(c.jsx)("input",{placeholder:"Doe",name:"lastName",type:"lastName",id:"lastName",onChange:x})]}),Object(c.jsxs)("div",{children:[Object(c.jsx)("label",{htmlFor:"email",children:"Email: "}),Object(c.jsx)("input",{placeholder:"johndoe@test.com",name:"email",type:"email",id:"email",onChange:x})]}),Object(c.jsxs)("div",{children:[Object(c.jsx)("label",{htmlFor:"password",children:"Password: "}),Object(c.jsx)("input",{placeholder:"******",name:"password",type:"password",id:"password",onChange:x})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"Signup"})})]}),d&&Object(c.jsx)("div",{children:"Signup failed, please try again!"})]})};var me=function(){return Object(c.jsxs)("header",{className:"flex-row px-1",children:[Object(c.jsx)("h1",{children:Object(c.jsx)(u.b,{to:"/",children:"The Maker's Corner"})}),Object(c.jsx)("nav",{children:A.loggedIn()?Object(c.jsxs)("ul",{className:"flex-row",children:[Object(c.jsx)("li",{className:"mx-1",children:Object(c.jsx)(u.b,{to:"/blueprints",children:"Blueprints"})}),Object(c.jsx)("li",{className:"mx-1",children:Object(c.jsx)(u.b,{to:"/classes",children:"Classes"})}),Object(c.jsx)("li",{className:"mx-1",children:Object(c.jsx)(u.b,{to:"/dashboard",children:"Dashboard"})}),Object(c.jsx)("li",{className:"mx-1",children:Object(c.jsx)(u.b,{to:"/orderHistory",children:"Order History"})}),Object(c.jsx)("li",{className:"mx-1",children:Object(c.jsx)("a",{href:"/",onClick:function(){return A.logout()},children:"Logout"})})]}):Object(c.jsxs)("ul",{className:"flex-row",children:[Object(c.jsx)("li",{className:"mx-1",children:Object(c.jsx)(u.b,{to:"/blueprints",children:"Blueprints"})}),Object(c.jsx)("li",{className:"mx-1",children:Object(c.jsx)(u.b,{to:"/classes",children:"Classes"})}),Object(c.jsx)("li",{className:"mx-1",children:Object(c.jsx)(u.b,{to:"/signup",children:"Signup"})}),Object(c.jsx)("li",{className:"mx-1",children:Object(c.jsx)(u.b,{to:"/login",children:"Login"})})]})})]})},xe=function(){return Object(c.jsx)("footer",{className:"w-100 mt-auto bg-secondary p-4",children:Object(c.jsx)("div",{className:"container",children:"\xa92020 by John, Keegan, Ali, Jess"})})},ge=new l.a({request:function(e){var t=localStorage.getItem("id_token");e.setContext({headers:{authorization:t?"Bearer ".concat(t):""}})},uri:"/graphql"});var fe=function(){return Object(c.jsx)(o.ApolloProvider,{client:ge,children:Object(c.jsx)(u.a,{children:Object(c.jsxs)("div",{className:"flex-column justify-flex-start min-100-vh",children:[Object(c.jsxs)(x.a,{store:X,children:[Object(c.jsx)(me,{}),Object(c.jsx)("div",{className:"container",children:Object(c.jsxs)(j.c,{children:[Object(c.jsx)(j.a,{exact:!0,path:"/",component:te}),Object(c.jsx)(j.a,{exact:!0,path:"/blueprints",component:re}),Object(c.jsx)(j.a,{exact:!0,path:"/classes",component:ae}),Object(c.jsx)(j.a,{exact:!0,path:"/dashboard",component:se}),Object(c.jsx)(j.a,{exact:!0,path:"/login",component:Oe}),Object(c.jsx)(j.a,{exact:!0,path:"/signup",component:pe}),Object(c.jsx)(j.a,{exact:!0,path:"/messageboard",component:he}),Object(c.jsx)(j.a,{component:ne})]})})]}),Object(c.jsx)(xe,{})]})})})},ve=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,110)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),c(e),r(e),a(e),s(e)}))};i.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(fe,{})}),document.getElementById("root")),ve()},99:function(e,t,n){}},[[107,1,2]]]);
//# sourceMappingURL=main.6437e265.chunk.js.map
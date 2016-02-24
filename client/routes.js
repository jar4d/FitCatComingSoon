  // Routes
  Router.map(function () {
    // home page
    this.route('landing', {
      path: '/',
    });



    // admin page
    this.route('admin', {
      onBeforeAction: function () {
        if (!isAdmin())
          this.render('adminLogin');
        else
          this.next();
      },
      path: '/admin'
    });
  });
  // End Routes
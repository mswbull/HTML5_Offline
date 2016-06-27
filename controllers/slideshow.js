/* ==================== Slideshow Controller ==================== */

var slideshowController = new TKPageSliderController({
  id: 'slideshow',
  previousPageButton : '.left-arrow',
  nextPageButton : '.right-arrow',
  activatesFocusedPage : false,
  navigatesTo : [
    { selector: '.home', controller: homeController },
    { selector: '.exit-fullscreen', controller: 'photos' }
  ]
});

/* ==================== View Management ==================== */

// sets the image to match the image currently showing in the carousel
slideshowController.viewWillAppear = function () {
  this.highlightedPageIndex = photosController.highlightedPageIndex;
};

slideshowController.viewDidAppear = function () {
	this.activity = new createHovers(slideshowController._view);
};

slideshowController.viewDidLoad = function () {
  this.slidingViewData = {
    orientation: TKSlidingViewOrientationHorizontal,
    activeElementIndex: photosController.highlightedPageIndex,
    sideElementsVisible: 2,
    distanceBetweenElements: 0,  // distance between the center points of elements
    sideOffsetBefore: 0, // any extra gap you want between center and "before" element
    sideOffsetAfter: 0, // any extra gap you want between center and "after" element
    incrementalLoading: true,
    loops: true,
    elements: this.createPhotos()
  };
  //console.log('viewDidLoad');
};

slideshowController.viewDidDisappear = function () {
  // this.activity.disable();
};

slideshowController.pageWasHighlighted = function () {
  photosController.highlightedPageIndex = slideshowController.highlightedPageIndex;
};

slideshowController.createPhotos = function () {
  var elements = [];
  for (var i = 1; i <= appData.numberOfPhotos; i++) {
    var padded_index = (i < 10) ? '0' + i : i;
    var url = 'images/photos/fullscreen' + padded_index + '.jpg';
    elements.push({ 
      type: 'container',
      children: [ {type: 'image', src: url } ]
    });
  }
  return elements;
};


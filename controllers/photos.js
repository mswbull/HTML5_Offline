/* ==================== Photos Controller ==================== */

var photosController = new TKPageSliderController({
  id: 'photos',
  previousPageButton : '.left-arrow',
  nextPageButton : '.right-arrow',
  activatesFocusedPage : false,
  highlightedElement : '.right-arrow',
  navigatesTo : [
    { selector: '.home', controller: homeController },
    { selector: '.enter-fullscreen', controller: 'slideshow' }
  ],
});

/* ==================== View Management ==================== */

photosController.viewDidLoad = function () {
  // customize the sliding view
  this.slidingViewData = {
    orientation: TKSlidingViewOrientationHorizontal,
    activeElementIndex: 0,
    sideElementsVisible: 2,
    distanceBetweenElements: 1024,  // distance between the center points of elements
    sideOffsetBefore: 0, // any extra gap you want between center and "before" element
    sideOffsetAfter: 0, // any extra gap you want between center and "after" element
    elements: this.createPhotos(),
    incrementalLoading : true
  };
  // customize the page control
  this.pageControlData = {
    numPages: appData.numberOfPhotos,
    distanceBetweenPageIndicators: 149.333333333333,
    showPageElements: false,
    indicatorElement: { type: "emptyDiv" },
    pageElement: { type: "emptyDiv" },
    incrementalJumpsOnly: false,
    allowsDragging: true
  };
};

photosController.createPhotos = function () {
	var elements = [];
	for (var i = 1; i <= appData.numberOfPhotos; i++) {
		var padded_index = (i < 10) ? '0' + i : i;
		var url = 'images/photos/photo' + padded_index + '.jpg';
		var captionString = appData.imageCaptions[i-1];
		elements.push({ 
					  type: 'container',
					  children: [{type: 'image', src: url },{type : 'text', className: 'imageCaptionContent', text: captionString }]
					  });
	}
	return elements;
};

// called when the user activates the focused pages
photosController.pageWasSelected = function (index) {
  this.photoIndex = index;
  TKNavigationController.sharedNavigation.pushController(slideshowController);
};
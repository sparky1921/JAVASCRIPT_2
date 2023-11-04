$(document).ready(function() {
    // Accordion
    $('.accordion').on('click', '.accordion-control', function(e) {
        e.preventDefault();
        var $panel = $(this).next('.accordion-panel');
        
        if (!$panel.is(':animated')) {
            $panel.slideToggle();
        }
    });

    // Tabs
    $('.tab-list').each(function() {
        var $tabList = $(this);
        var $activeTab = $tabList.find('li.active');
        var $activeLink = $activeTab.find('a');
        var $activePanel = $($activeLink.attr('href'));

        $tabList.on('click', '.tab-control', function(e) {
            e.preventDefault();
            var $link = $(this);
            var id = this.hash;

            if (id && !$link.is('.active')) {
                $activePanel.removeClass('active');
                $activeTab.removeClass('active');

                $activePanel = $(id).addClass('active');
                $activeTab = $link.parent().addClass('active');
            }
        });
    });
});

(function() {

  const data = {
    currentCat: null,
    cats: [
    {
      name: 'Romeu',
      imgSrc: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496',
      counter: 0
    },
    {
      name: 'Kittie',
      imgSrc: 'https://images.pexels.com/photos/126407/pexels-photo-126407.jpeg?auto=compress&cs=tinysrgb&h=350',
      counter: 0
    },
    {
      name: 'Meow',
      imgSrc: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350',
      counter: 0
    },
    {
      name: 'Purr',
      imgSrc: 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      counter: 0
    },  
  ]}

  const controller = {
    getCats: () => {
      return data.cats
    },
    setCurrentCat: cat => {
      data.currentCat = cat;
      viewCat.render();
    },
    getCurrentCat: () => {
      return data.currentCat;
    },
    addCounterToCurrentCat: () => {
      data.currentCat.counter += 1;
      viewCat.render();
    },
    init: () => {
      data.currentCat = data.cats[0];
      viewList.init();
      viewCat.init();
    }
  }

  const viewList = {
    init: () => {
      this.$catList = document.getElementById('cat-list');
      viewList.render();
    },

    render: () => {
      // empty the cat list
      this.$catList.innerHTML = '';

      controller.getCats().forEach( cat => {

          elem = document.createElement('li');
          elem.textContent = cat.name;

          elem.addEventListener('click', ( catCopy => {
              return () => {
                  controller.setCurrentCat(catCopy);
                  viewCat.render();
              };
          })(cat));

          this.$catList.appendChild(elem);
      });
    }
  }

  const viewCat = {
    init: () => {
      this.$catImg = document.getElementById('cat-img');
      this.$catCounter = document.getElementById('cat-counter');

      this.$catImg.addEventListener('click', e => {
        controller.addCounterToCurrentCat();
      });

      viewCat.render();
    },

    render: () => {
      const currentCat = controller.getCurrentCat();
      this.$catImg.src = currentCat.imgSrc;
      this.$catCounter.innerHTML = currentCat.counter;
    }
  } 

  controller.init();

}());
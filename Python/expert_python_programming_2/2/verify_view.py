test_dict = {1:1,2:2}
print(type(test_dict.keys()))

ks = test_dict.keys()
print(list(ks))
test_dict.update(d=3)
print(list(ks))

